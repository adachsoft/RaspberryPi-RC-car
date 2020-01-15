<?php

$res = shell_exec("nohup sh 
sh/server_start.sh");
echo $res;