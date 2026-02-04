export function generateIamfConfig(
  wavFilename: string,
  durationSamples: number,
  sampleRate: number = 48000,
  qualityKbps: number = 96,
  outputPrefix: string = "output"
): string {
  // Constants for Opus
  const frameSize = 960;
  const preSkip = 312;
  const targetBitratePerChannel = qualityKbps * 1000;

  // Calculate padded duration (multiple of frameSize)
  const numFrames = Math.ceil((durationSamples) / frameSize);
  const paddedDuration = numFrames * frameSize;
  const samplesToTrimAtEnd = paddedDuration - durationSamples;

  // Ambisonic Order 3 (16 channels)
  const numChannels = 16;
  const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
  const channelMapping = Array.from({ length: numChannels }, (_, i) => i);

  // Channel labels: A_0 to A_15 (ACN order)
  const channelMetadatas = substreamIds.map(id =>
    `{ channel_id: ${id} channel_label: CHANNEL_LABEL_A_${id} }`
  ).join(',\n    ');

  return `
test_vector_metadata {
  human_readable_description: "3rd Order Ambisonics IAMF (16 ch)"
  file_name_prefix: "${outputPrefix}"
  is_valid: true
  is_valid_to_decode: true
}

ia_sequence_header_metadata {
  primary_profile: PROFILE_VERSION_SIMPLE
  additional_profile: PROFILE_VERSION_SIMPLE
}

codec_config_metadata {
  codec_config_id: 200
  codec_config {
    codec_id: CODEC_ID_OPUS
    num_samples_per_frame: ${frameSize}
    audio_roll_distance: -4
    decoder_config_opus {
      version: 1
      pre_skip: ${preSkip}
      input_sample_rate: ${sampleRate}
      mapping_family: 0
      # Family 0 for mono substreams
      opus_encoder_metadata {
        target_bitrate_per_channel: ${targetBitratePerChannel}
        application: APPLICATION_AUDIO
      }
    }
  }
}

audio_element_metadata {
  audio_element_id: 300
  audio_element_type: AUDIO_ELEMENT_SCENE_BASED
  codec_config_id: 200
  audio_substream_ids: [${substreamIds.join(', ')}]
  ambisonics_config {
    ambisonics_mode: AMBISONICS_MODE_MONO
    ambisonics_mono_config {
      output_channel_count: ${numChannels}
      substream_count: ${numChannels}
      channel_mapping: [${channelMapping.join(', ')}]
    }
  }
}

mix_presentation_metadata {
  mix_presentation_id: 42
  annotations_language: ["en-us"]
  localized_presentation_annotations: ["Ambisonic Mix"]
  sub_mixes {
    audio_elements {
      audio_element_id: 300
      localized_element_annotations: ["Ambisonics"]
      rendering_config {
        headphones_rendering_mode: HEADPHONES_RENDERING_MODE_STEREO
      }
      element_mix_gain {
        param_definition {
          parameter_id: 100
          parameter_rate: ${sampleRate}
          param_definition_mode: 1
          reserved: 0
        }
        default_mix_gain: 0
      }
    }
    output_mix_gain {
      param_definition {
        parameter_id: 100
        parameter_rate: ${sampleRate}
        param_definition_mode: 1
        reserved: 0
      }
      default_mix_gain: 0
    }
    layouts {
      loudness_layout {
         layout_type: LAYOUT_TYPE_LOUDSPEAKERS_SS_CONVENTION
         ss_layout { sound_system: SOUND_SYSTEM_A_0_2_0 }
      }
    }
  }
}

audio_frame_metadata {
  wav_filename: "${wavFilename}"
  samples_to_trim_at_end: ${samplesToTrimAtEnd}
  samples_to_trim_at_start: ${preSkip}
  audio_element_id: 300
  channel_metadatas: [
    ${channelMetadatas}
  ]
}

parameter_block_metadata {
  parameter_id: 100
  start_timestamp: 0
  duration: ${paddedDuration}
  constant_subblock_duration: ${paddedDuration}
  subblocks: [
    {
      mix_gain_parameter_data {
        animation_type: ANIMATE_STEP
        param_data {
          step { start_point_value: 0 }
        }
      }
    }
  ]
}
`;
}
