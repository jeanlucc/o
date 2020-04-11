<?php

$messages = [];
foreach ([
    '2020_07_01',
    '2020_07_02',
    '2020_07_03',
    '2020_07_04',
    '2020_07_05',
    '2020_07_06',
    '2020_07_08',
    '2020_07_12',
    '2020_07_13',
    '2020_07_19',
    '2020_07_27',

] as $date) {
    $messages = array_merge($messages, json_decode(file_get_contents(__DIR__."/data_$date.json"), true));
}

//    '2020_05_01',
//    '2020_05_02',
//    '2020_05_03',
//    '2020_05_04',
//    '2020_05_05',
//    '2020_05_06',
//    '2020_05_08',
//    '2020_05_09',
//    '2020_05_10',
//    '2020_05_11',
//    '2020_05_12',
//    '2020_05_13',
//    '2020_05_14',
//    '2020_05_15',
//    '2020_05_16',
//    '2020_05_17',
//    '2020_05_18',
//    '2020_05_19',
//    '2020_05_21',
//    '2020_05_22',
//    '2020_05_23',
//    '2020_05_24',
//    '2020_05_25',
//    '2020_05_26',
//    '2020_05_27',
//    '2020_05_28',
//    '2020_05_29',
//    '2020_05_30',
//    '2020_05_31',

//    '2020_06_01',
//    '2020_06_02',
//    '2020_06_03',
//    '2020_06_04',
//    '2020_06_05',
//    '2020_06_06',
//    '2020_06_07',
//    '2020_06_08',
//    '2020_06_09',
//    '2020_06_10',
//    '2020_06_11',
//    '2020_06_12',
//    '2020_06_13',
//    '2020_06_14',
//    '2020_06_15',
//    '2020_06_16',
//    '2020_06_17',
//    '2020_06_18',
//    '2020_06_19',
//    '2020_06_20',
//    '2020_06_21',
//    '2020_06_22',
//    '2020_06_23',
//    '2020_06_24',
//    '2020_06_25',
//    '2020_06_26',
//    '2020_06_27',
//    '2020_06_28',
//    '2020_06_29',
//    '2020_06_30',


$messages = array_map('unserialize', array_unique(array_map('serialize', $messages)));

function sumAndSort(array $messages, $aggregateFieldName, $sortCriterion)
{
    $planets = [];
    foreach ($messages as $message) {
        $message = parseMessage($message);
        $planetName = $message[$aggregateFieldName];
        if (isset($planets[$planetName])) {
            $planets[$planetName] = [
                'metal' => $planets[$planetName]['metal'] + $message['metal'],
                'cristal' => $planets[$planetName]['cristal'] + $message['cristal'],
                'deuterium' => $planets[$planetName]['deuterium'] + $message['deuterium'],
                'count' => $planets[$planetName]['count'] + 1,
            ];
        } else {
            $planets[$planetName] = [
                'metal' => $message['metal'],
                'cristal' => $message['cristal'],
                'deuterium' => $message['deuterium'],
                'count' => 1,
            ];
        }
    }

    $rows = [];
    foreach ($planets as $planetName => $planet) {
        $rows[] = [$planetName, $planet['metal'], $planet['cristal'], $planet['deuterium'], $planet['count']];
    }

    usort($rows, function  ($row1, $row2) use ($sortCriterion) {
        if ($row1[$sortCriterion] === $row2[$sortCriterion]) {
            return 0;
        }

        return $row1[$sortCriterion] < $row2[$sortCriterion] ? 1 : -1;
    });

    foreach ($rows as $row) {
        echo implode(', ', $row)."\n";
    }
}

function parseMessage($message)
{
    foreach (['metal', 'cristal', 'deuterium'] as $resourceName) {
        $message[$resourceName] = intval(str_replace('.', '', $message[$resourceName]));
    }

    return $message;
}

sumAndSort($messages, 'targetName', 2);
//sumAndSort($messages, 'planetName', 2);
