<?php

namespace App\Encoder;

class Encoder
{
    public function encode($image, $hash)
    {
        $path = 'assets/videos/' . $hash;

        if (!file_exists($path)) {
            mkdir($path);
        }

        exec('ffmpeg -loop 1 -i ' . $image . ' -t 15 -vcodec h263 ' . $path  . '/video.mp4', $output, $exit_status);

        return $hash;
    }
}
