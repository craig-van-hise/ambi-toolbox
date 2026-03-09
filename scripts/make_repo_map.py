import os
import re

# Directories to ignore
IGNORE_DIRS = {'.git', 'node_modules', '.agent', 'dist', 'build', '__pycache__'}
# File extensions to parse
VALID_EXTS = {'.ts', '.js', '.py'} 

# Regex to catch signatures (adjust based on your primary language)
SIGNATURE_REGEX = re.compile(r'^(export\s+)?(const|let|var|function|class|def)\s+([a-zA-Z0-9_]+)')

def generate_repo_map(output_file='repo-map.md'):
    with open(output_file, 'w', encoding='utf-8') as out:
        out.write("# Repository Map\n\n")
        
        for root, dirs, files in os.walk('.'):
            # Mutate dirs in-place to skip ignored directories
            dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
            
            for file in files:
                if any(file.endswith(ext) for ext in VALID_EXTS):
                    filepath = os.path.join(root, file)
                    out.write(f"\n### `{filepath}`\n```\n")
                    
                    try:
                        with open(filepath, 'r', encoding='utf-8') as f:
                            for line in f:
                                stripped = line.strip()
                                # Print the line if it looks like a function/class/export signature
                                if SIGNATURE_REGEX.match(stripped):
                                    out.write(f"{stripped}\n")
                    except Exception as e:
                        out.write(f"// Error reading file\n")
                    
                    out.write("```\n")

if __name__ == '__main__':
    generate_repo_map()
    print("Generated repo-map.md")
