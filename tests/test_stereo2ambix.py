import sys
import os
import numpy as np
import pytest

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'py'))

@pytest.fixture
def mock_stereo_data():
    sample_rate = 48000
    duration = 0.5 # seconds
    t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)
    # Create simple stereo signal
    left = np.sin(2 * np.pi * 440 * t) + np.random.normal(0, 0.01, len(t))
    right = np.sin(2 * np.pi * 880 * t) + np.random.normal(0, 0.01, len(t))
    return np.vstack((left, right)).T, sample_rate

def test_pca_extraction_shape():
    from stereo_to_ambix import extract_primary_ambient
    
    # Needs to be exactly 4096 frames
    audio = np.random.randn(4096, 2)
    win = np.hanning(4096)[:, None]
    block_win = audio * win
    
    primary, ambient = extract_primary_ambient(block_win)
    
    assert primary.shape == audio.shape
    assert ambient.shape == audio.shape

def test_ambisonic_encoding_shape():
    from stereo_to_ambix import process_block
    
    audio_hop = np.random.randn(2048, 2)
    z1 = np.random.randn(2048, 2)
    
    # Test for 1st order (4 channels)
    order = 1
    num_channels = (order + 1) ** 2
    
    out = process_block(audio_hop, order, stage_width=90, envelopment=50, z1=z1)
    
    assert out.shape[0] == 4096
    assert out.shape[1] == num_channels
    
    # Test for 3rd order (16 channels)
    order = 3
    num_channels = (order + 1) ** 2
    out = process_block(audio_hop, order, stage_width=90, envelopment=50, z1=z1)
    assert out.shape[1] == num_channels

def test_fail_safe_extraction_zero_phase():
    from stereo_to_ambix import extract_primary_ambient
    
    audio = np.random.randn(4096, 2)
    
    # The PCA outputs must be mathematically orthogonal and perfectly sum to the input over FFT bins
    primary, ambient = extract_primary_ambient(audio)
    
    summed = primary + ambient
    np.testing.assert_allclose(summed, audio, atol=1e-5)
