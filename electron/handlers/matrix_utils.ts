export interface VirtualSpeaker {
    az: number; // Degrees
    el: number; // Degrees
    w: number;  // Quadrature Weight
}

export interface GridDefinition {
    channelCount: number;
    speakerCount: number;
    nodes: VirtualSpeaker[];
}

// 3rd Order Lebedev Grid (26 nodes)
export const VirtualSpeakerGrids: Record<string, GridDefinition> = {
    order3: {
        channelCount: 16,
        speakerCount: 26,
        nodes: [
            // 6 Face Centers
            { az: 0, el: 0, w: 0.033333333 }, { az: 180, el: 0, w: 0.033333333 },
            { az: 90, el: 0, w: 0.033333333 }, { az: -90, el: 0, w: 0.033333333 },
            { az: 0, el: 90, w: 0.033333333 }, { az: 0, el: -90, w: 0.033333333 },
            // 8 Vertices
            { az: 45, el: 35.26439, w: 0.027777778 }, { az: 135, el: 35.26439, w: 0.027777778 },
            { az: -135, el: 35.26439, w: 0.027777778 }, { az: -45, el: 35.26439, w: 0.027777778 },
            { az: 45, el: -35.26439, w: 0.027777778 }, { az: 135, el: -35.26439, w: 0.027777778 },
            { az: -135, el: -35.26439, w: 0.027777778 }, { az: -45, el: -35.26439, w: 0.027777778 },
            // 12 Edge Midpoints
            { az: 0, el: 45, w: 0.032222222 }, { az: 180, el: 45, w: 0.032222222 },
            { az: 90, el: 45, w: 0.032222222 }, { az: -90, el: 45, w: 0.032222222 },
            { az: 0, el: -45, w: 0.032222222 }, { az: 180, el: -45, w: 0.032222222 },
            { az: 90, el: -45, w: 0.032222222 }, { az: -90, el: -45, w: 0.032222222 },
            { az: 45, el: 0, w: 0.032222222 }, { az: 135, el: 0, w: 0.032222222 },
            { az: -135, el: 0, w: 0.032222222 }, { az: -45, el: 0, w: 0.032222222 }
        ]
    }
};

// Associated Legendre Polynomials (Hardcoded for stability up to Order 3)
// Reference: recursive calculation or lookup table. For N=3, it's small enough to inline
// but a general recursive function is cleaner.


// Since we only need specific values, let's use a direct computation function


function factorial(n: number): number {
    if (n <= 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
}

// Real Spherical Harmonic (SN3D)


// Re-implementing simplified P_lm without CS phase for clarity
function getP_lm(l: number, m: number, x: number): number {
    let pmm = 1.0;
    if (m > 0) {
        const somx2 = Math.sqrt((1 - x) * (1 + x));
        let fact = 1.0;
        for (let i = 1; i <= m; i++) {
            pmm *= -fact * somx2; // The minus here IS the CS phase
            fact += 2.0;
        }
    }
    // To remove CS phase:
    if (m % 2 === 1) pmm = -pmm;

    if (l === m) return pmm;

    let pmmp1 = x * (2 * m + 1) * pmm;
    if (l === m + 1) return pmmp1;

    let pll = 0.0;
    for (let ll = m + 2; ll <= l; ll++) {
        pll = ((2 * ll - 1) * x * pmmp1 - (ll + m - 1) * pmm) / (ll - m);
        pmm = pmmp1;
        pmmp1 = pll;
    }
    return pll;
}

function getACN(l: number, m: number, azRad: number, elRad: number): number {

    // cos(colat) = sin(el) ? No.
    // colatitude phi = 90 - el.
    // cos(phi) = cos(90-el) = sin(el).
    const x = Math.sin(elRad);

    const abs_k = Math.abs(m);
    const P = getP_lm(l, abs_k, x);

    // SN3D Normalization Factor: sqrt( (2 - delta_m0) * (l - |m|)! / (l + |m|)! )
    // delta_m0 is 1 if m=0, else 0.
    const delta = (m === 0) ? 1 : 0;
    const fact_diff = factorial(l - abs_k);
    const fact_sum = factorial(l + abs_k);
    const norm = Math.sqrt((2 - delta) * fact_diff / fact_sum);

    let Y = norm * P;

    if (m > 0) {
        Y *= Math.cos(m * azRad);
    } else if (m < 0) {
        Y *= Math.sin(abs_k * azRad);
    }

    return Y;
}




export function getPanFilter(order: number, sofaPath: string | null): string {
    if (!sofaPath) return ''; // Fallback handled by caller (stereo)

    // Only supporting Order 3 for now as per Grid
    if (order !== 3) order = 3;

    const grid = VirtualSpeakerGrids.order3;


    // Generate PAN Matrix: 26 Outputs, 16 Inputs
    // Format: "c0|c1|...|c25=w00*c0+w01*c1+...+w015*c15|..."

    let filterParts: string[] = [];

    // Calculate Matrix Rows (one per speaker)
    for (let s = 0; s < grid.nodes.length; s++) {
        const node = grid.nodes[s];
        const azRad = node.az * Math.PI / 180;
        const elRad = node.el * Math.PI / 180;

        // Sum parts for this speaker
        let sumParts: string[] = [];

        let acnIndex = 0;
        for (let l = 0; l <= order; l++) {
            for (let m = -l; m <= l; m++) {
                const Y = getACN(l, m, azRad, elRad);
                // Weight = Y * QuadWeight * MaxRE
                // Using QuadWeight from grid causes typical amplitude scaling 
                const gain = Y * node.w * 4.0 * Math.PI; // 4pi term

                if (Math.abs(gain) > 0.0001) {
                    sumParts.push(`${gain.toFixed(4)}*c${acnIndex}`);
                }
                acnIndex++;
            }
        }

        // Output channel s
        filterParts.push(`c${s}=${sumParts.join('+')}`);
    }

    const panFilter = `pan=${grid.speakerCount}c|${filterParts.join('|')}`;

    // SOFALIZER
    // Map virtual speakers to sofalizer inputs.
    // sofalizer=sofa=/path:speakers=POSITIONS
    // We need to define the speaker positions for sofalizer custom setup?
    // "sofalizer" filter usually takes a standard layout OR custom.
    // If custom, we need to declare the positions?
    // Actually, sofalizer usually takes a fixed input layout (stereo, quad, 5.1, 7.1, etc) OR
    // we can assume the inputs are virtual speakers corresponding to the SOFA directions?
    // FFmpeg sofalizer manual: "speakers" option.
    // "virtual" speakers for sofalizer are usually defined by the SOFA file itself if we map 1:1?
    // No, standard usage: `sofalizer=sofa=file.sofa:type=freq:radius=1`
    // It inputs N channels. It tries to match them to the SOFA positions?
    // We need to tell sofalizer where our N channels are located.

    // Construct speaker layout string for sofalizer
    // "az0 el0|az1 el1|..."
    const speakerPos = grid.nodes.map(n => `${n.az} ${n.el}`).join('|');

    // sofalizer filter
    const sofalizer = `sofalizer=sofa='${sofaPath}':speakers='${speakerPos}'`;

    // Chain them
    return `${panFilter} [virt]; [virt] ${sofalizer}`;
}
