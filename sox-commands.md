## Comandos para visualizar infos (bit, size, duration...)

sox \
 --i \
 "audio/songs/conversation.mp3"

sox \
 --i \
 "audio/fx/Boo! Sound Effect (128 kbps).mp3"

## Tratamento de bitRate

sox \
 -v 0.99 \
 --type mp3 \
 "audio/fx/Applause Sound Effect HD No Copyright (128 kbps).mp3" \
 -r 48000 \
 --type mp3 \
 "output.mp3"

(v) = volume
(t) = tipo do arquivo (entrada)
"" = caminho do arquivo (entrada)
(r) = taxa de bitrate
(t) = tipo do arquivo (saida)
"" = caminho do arquivo (saida)


## Obter o bitrate

sox \
 --i \
 -B   \
 "audio/fx/Boo! Sound Effect (128 kbps).mp3"


## Concatenar dois audios

sox \ 
  -t mp3 \
  -v 0.99 \
  -m "audio/songs/conversation.mp3" \ 
  -t mp3 \
  -v 0.99 \
  "audio/fx/Fart - Gaming Sound Effect (HD) (128 kbps).mp3" \
  -t mp3 \
  "output.mp3"

(m) = "de onde vamos mergiar"
