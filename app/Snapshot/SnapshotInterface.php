<?php

namespace App\Snapshot;

interface SnapshotInterface
{
    public function takeSnapshot($options=[]);
}