import soundfile as sf

print("Available Formats:")
for fmt in sorted(sf.available_formats().keys()):
    print(f"  {fmt}: {sf.available_formats()[fmt]}")

print("\nAvailable Subtypes (Codecs):")
for sub in sorted(sf.available_subtypes().keys()):
    print(f"  {sub}: {sf.available_subtypes()[sub]}")

print("\nCheck Specifics:")
print(f"  CAF Supported: {'CAF' in sf.available_formats()}")
print(f"  OPUS Supported: {'OPUS' in sf.available_formats() or 'OPUS' in sf.available_subtypes()}")
