cmake_minimum_required(VERSION 3.28)

project(obr_stream)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# ------------------------------------------------------------------------------
# 1. Fetch Abseil (As requested in PRP #83-2)
# ------------------------------------------------------------------------------
include(FetchContent)
FetchContent_Declare(
  absl
  GIT_REPOSITORY https://github.com/abseil/abseil-cpp.git
  GIT_TAG 20240116.2
)
set(ABSL_PROPAGATE_CXX_STD ON)
FetchContent_MakeAvailable(absl)

# ------------------------------------------------------------------------------
# 2. Add OBR Library
# ------------------------------------------------------------------------------
# This will use the 'obr' target defined in vendor/obr/CMakeLists.txt
# Since we declared absl above, OBR's FetchContent for absl should respect our version (or be skipped if it checks).
add_subdirectory(vendor/obr)

# ------------------------------------------------------------------------------
# 3. Build sidecar executable
# ------------------------------------------------------------------------------
add_executable(obr_stream obr_stream.cc)

# Find absolute path to static OBR library to avoid link issues if target not fully propagated?
# Ideally linking against 'obr' target works.
target_link_libraries(obr_stream PRIVATE
    obr
    absl::flags
    absl::flags_parse
    absl::strings
    absl::log_internal_check_op # Sometimes needed for logging macros
)
