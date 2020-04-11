<?php

const UNIVERSE_SPEED_FACTOR = 6;
const PLANET_COUNT = 10;

function printData()
{
    $maxTemp = 12;
    $neededDeut = 27000;

    $data = [];
    for ($sLevel = 1; $sLevel < 45; $sLevel++) {
        for ($fLevel = 0; $fLevel < 30; $fLevel++) {
            for ($eLevel = 12; $eLevel < 25; $eLevel++) {
                $production = getProduction($sLevel, $fLevel, $eLevel, $neededDeut, $maxTemp);
                $metal = getMetal($sLevel, $fLevel, $eLevel, $neededDeut, $maxTemp);
                $cristal = getCristal($sLevel, $fLevel, $eLevel, $neededDeut, $maxTemp);
                $deuterium = getDeuterium($sLevel, $fLevel, $eLevel, $neededDeut, $maxTemp);

                $score = getScore($metal, $cristal, $deuterium);

                $data[] = [$production, $sLevel, $fLevel, $eLevel, $metal/$production, $cristal/$production, $deuterium/$production, $score/$production];
            }
        }
    }

    $data = filter($data);

    foreach ($data as $row) {
        echo implode(', ', $row)."\n";
    }
    $production = 13409;
    $metal = 64715833;
    $cristal = 25886333;
    $row = [$production, 32, 0, 12, $metal/$production, $cristal/$production, 0, getScore($metal, $cristal, 0)/$production];
    echo implode(', ', $row)."\n";

}

function filter(array $data): array
{
    usort($data, function($row1, $row2) {
        if ($row1[0] === $row2[0]) {
            return 0;
        }
        return $row1[0] > $row2[0] ? -1 : 1;
    });

    $rows = [];
    for ($i = 0; $i < count($data); $i++) {
        $row = $data[$i];
        $j = count($rows)-1;
        $foundBetter = false;
        while ($j >= 0) {
            $rowToCompare = $rows[$j];
            if ($rowToCompare[0] >= min($row[0]+3500, max($row[0]*1.1, $row[0]+50))) {
                break;
            }
            if ($rowToCompare[7] <= $row[7]) {
                $foundBetter = true;
                break;
            }
            $j--;
        }
        if (!$foundBetter) {
            $rows[] = $row;
        }
    }

    return $rows;
}

// PRODUCTION
function getProduction(int $sLevel, int $fLevel, int $eLevel, int $neededDeut, int $maxTemp): int
{
    return getSolarProduction($sLevel) + getTotalFusionProduction($fLevel, $eLevel, $neededDeut, $maxTemp);
}

function getSolarProduction(int $sLevel): int
{
    return floor(20 * $sLevel * 1.1**$sLevel);
}

function getTotalFusionProduction(int $fLevel, int $eLevel, int $neededDeut, int $maxTemp)
{
    return getFusionProduction($fLevel, $eLevel) - getDeuteriumEnergyConsoForFusion($fLevel, $neededDeut, $maxTemp);
}

function getFusionProduction(int $fLevel, int $eLevel): int
{
    return floor(30 * $fLevel * (1.05 + $eLevel * 0.01)**$fLevel);
}

// METAL
function getMetal(int $sLevel, int $fLevel, int $eLevel, int $neededDeut, int $maxTemp): int
{
    return getSolarMetal($sLevel) + getTotalFusionMetal($fLevel, $neededDeut, $maxTemp);
}

function getSolarMetal(int $sLevel)
{
    return ceil(75 * (1 - 1.5**$sLevel) / (-0.5));
}

function getTotalFusionMetal(int $fLevel, int $neededDeut, int $maxTemp)
{
    return getFusionMetal($fLevel) + getDeuteriumMetalForFusion($fLevel, $neededDeut, $maxTemp);
}

function getFusionMetal($fLevel)
{
    return ceil(900 * (1 - 1.8**$fLevel) / (-0.8));
}

function getDeuteriumMetalForFusion(int $fLevel, int $neededDeut, int $maxTemp)
{
    return getDeuteriumMetal(getDeuteriumLevelForFusion($fLevel, $neededDeut, $maxTemp)) - getDeuteriumMetal(getDeuteriumLevelForNeeded($neededDeut, $maxTemp));
}

// CRISTAL
function getCristal(int $sLevel, int $fLevel, int $eLevel, int $neededDeut, int $maxTemp): int
{
    return getSolarCristal($sLevel) + getTotalFusionCristal($fLevel, $eLevel, $neededDeut, $maxTemp);
}

function getSolarCristal(int $sLevel)
{
    return ceil(30 * (1 - 1.5**$sLevel) / (-0.5));
}

function getTotalFusionCristal(int $fLevel, int $eLevel, int $neededDeut, int $maxTemp)
{
    return getFusionCristal($fLevel) + getDeuteriumCristalForFusion($fLevel, $neededDeut, $maxTemp) + getEnergyCristal($eLevel)/PLANET_COUNT;
}

function getFusionCristal($fLevel)
{
    return ceil(360 * (1 - 1.8**$fLevel) / (-0.8));
}

function getDeuteriumCristalForFusion(int $fLevel, int $neededDeut, int $maxTemp)
{
    return getDeuteriumCristal(getDeuteriumLevelForFusion($fLevel, $neededDeut, $maxTemp)) - getDeuteriumCristal(getDeuteriumLevelForNeeded($neededDeut, $maxTemp));
}

// DEUTERIUM
function getDeuterium(int $sLevel, int $fLevel, int $eLevel, int $neededDeut, int $maxTemp): int
{
    return getTotalFusionDeuterium($fLevel, $eLevel, $neededDeut, $maxTemp);
}

function getTotalFusionDeuterium(int $fLevel, int $eLevel)
{
    return getFusionDeuterium($fLevel) + getEnergyDeuterium($eLevel)/PLANET_COUNT;
}

function getFusionDeuterium($fLevel)
{
    return ceil(180 * (1 - 1.8**$fLevel) / (-0.8));
}

// ENERGY
function getEnergyCristal($eLevel)
{
    return max(0, 800*((2**($eLevel-1))-(2**11)));
}

function getEnergyDeuterium($eLevel)
{
    return max(0, 400*((2**($eLevel-1))-(2**11)));
}

// DEUTERIUM PRODUCTION
function getDeuteriumMetal(int $dLevel): int
{
    return ceil(225 * (1 - 1.5**$dLevel) / (-0.5));
}

function getDeuteriumCristal(int $dLevel): int
{
    return ceil(75 * (1 - 1.5**$dLevel) / (-0.5));
}

function getDeuteriumEnergyConso(int $dLevel)
{
    return ceil(20 * $dLevel * 1.1**$dLevel);
}

function getDeuteriumProduction(int $dLevel, int $maxTemp): int
{
    return round(10*$dLevel*(1.1**$dLevel)*(1.44-0.004*$maxTemp)*UNIVERSE_SPEED_FACTOR);
}

function getDeuteriumEnergyConsoForFusion(int $fLevel, int $neededDeut, int $maxTemp)
{
    return getDeuteriumEnergyConso(getDeuteriumLevelForFusion($fLevel, $neededDeut, $maxTemp)) -  getDeuteriumEnergyConso(getDeuteriumLevelForNeeded($neededDeut, $maxTemp));
}

function getDeuteriumLevelForFusion(int $fLevel, int $neededDeut, int $maxTemp): int
{
    return getDeuteriumLevelForNeeded($neededDeut + getDeuteriumFusionConso($fLevel), $maxTemp);
}

function getDeuteriumLevelForNeeded($neededDeut, $maxTemp)
{
    for ($dLevel = 1; $dLevel < 45; $dLevel++) {
        $production = getDeuteriumProduction($dLevel, $maxTemp);
        if ($production > $neededDeut) {
            return $dLevel;
        }
    }
}

function getDeuteriumFusionConso($fLevel)
{
    return floor(10 * $fLevel * 1.1**$fLevel * UNIVERSE_SPEED_FACTOR);
}

// SCORE
function getScore(int $metal, int $cristal, int $deuterium): int
{
    $metalCoef = 0.44;
    $deuteriumCoef = 3.15;

    $baseScore = $metal*$metalCoef + $cristal + $deuterium*$deuteriumCoef;
    $malusMetal = max(0, $metal*$metalCoef - $cristal);
    $malusDeuterium = max(0, $deuterium*$deuteriumCoef - $cristal);

    return round($baseScore+$malusMetal+$malusDeuterium);
}

/////////////////////////////////////////////////////////////////////////
function printSolaire()
{
    for ($sLevel = 1; $sLevel < 45; $sLevel++) {
        echo implode(', ', [$sLevel, getSolarProduction($sLevel)])."\n";
    }
}

function printFusionAlone(int $eLevel)
{
    for ($fLevel = 1; $fLevel < 45; $fLevel++) {
        echo implode(', ', [$fLevel, getFusionMetal($fLevel), getFusionProduction($fLevel, $eLevel), getDeuteriumFusionConso($fLevel)])."\n";
    }
}

function printElecTech()
{
    for ($eLevel = 1; $sLevel < 45; $sLevel++) {
        echo implode(', ', [$sLevel, getSolarProduction($sLevel)])."\n";
    }
}

function printDeut($maxTemp)
{
    for ($level = 1; $level < 45; $level++) {
        echo implode(', ', [$level, getDeuteriumProduction($level, $maxTemp)])."\n";
    }
}

function printDeuteriumLevelForFusion(int $neededDeut, int $maxTemp)
{
    for ($level = 1; $level < 45; $level++) {
        echo implode(', ', [$level, getDeuteriumLevelForFusion($level, $neededDeut, $maxTemp)])."\n";
    }
}

//printSolaire();
//printFusionAlone(12);
//printDeut(1);
//printDeuteriumLevelForFusion(17000, 1);

//echo getScore(2500,1000,400)."\n";
//echo getScore(2000,1000,300)."\n";
//echo getScore(12500,1000,300)."\n";
//echo getScore(2500,1000,1300)."\n";

printData();
