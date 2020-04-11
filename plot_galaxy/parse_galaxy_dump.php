<?php

$dump = json_decode(file_get_contents('./galaxy_5.json'), true);
$militaryClassementDump = json_decode(file_get_contents('./military_classement_2020_07_17.json'), true);
$economyClassementDump = json_decode(file_get_contents('./economy_classement_2020_07_17.json'), true);

$positive = [];
$negative = [];

for ($i = 1; $i < 500; $i++) {
    $positive[$i] = 0;
    $negative[$i] = [];
}

foreach ($dump as $planetData) {
    $x = $planetData['system'];
    $yPositive = $economyClassementDump[$planetData['playerLevel']]['points'] ?? null;
    $yNegative = $militaryClassementDump[$planetData['playerLevel']]['points'] ?? null;

    if (null === $yPositive && null === $yNegative) {
        continue;
    }

    if (in_array('status_abbr_vacation', $planetData['playerStatus']) || in_array('status_abbr_banned', $planetData['playerStatus'])) {
        continue;
    }

    $yInactive = in_array('status_abbr_longinactive', $planetData['playerStatus']) || in_array('status_abbr_inactive', $planetData['playerStatus']) ? $yPositive : null;
    if ($yInactive) {
        for ($i = -30; $i < 30; $i++) {
            $baseImpact = log($yInactive, 1.5);
            $distance = $i > 0 ? $i : -1 * $i;
            $coefficient = $distance > 0 ? (30 - $distance) / 30 : 2;

            $index = ($x + $i) % 499 + 1;
            $index = $index > 0 ? $index : $index + 499;

            $positive[$index] += $baseImpact * $coefficient;
        }
    }

    $yNormal = in_array('status_abbr_honorableTarget', $planetData['playerStatus']) || empty($planetData['playerStatus']) ? $yNegative : null;
    if ($yNormal) {
        for ($i = -30; $i < 30; $i++) {
            $baseImpact = log($yNormal, 1.02)-760;
            $baseImpact = $baseImpact > 0 ? $baseImpact : 0;
            $distance = $i > 0 ? $i : -1 * $i;
            $coefficient = $distance > 0 ? (30 - $distance) / 30 : 2;

            $index = ($x + $i) % 499 + 1;
            $index = $index > 0 ? $index : $index + 499;

            $negative[$index][$planetData['playerLevel']] = max(
                $negative[$index][$planetData['playerLevel']] ?? 0,
                $baseImpact * $coefficient
            );
        }
    }
}

$negative = array_map(
    function($negativePointData) {
        return array_sum($negativePointData);
    },
    $negative
);

for ($i = 1; $i < 500; $i++) {
    echo implode(', ', [$i, $positive[$i], $negative[$i]])."\n";
}
