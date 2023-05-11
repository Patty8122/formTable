
<?php
header('Access-Control-Allow-Origin: https://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST');

// handle for csv file
$myfile = fopen("../Input/input.csv", "w") or die("Unable to open file!");


$newCsvData = array();
if (($handle = fopen("test.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($myfile, 1000, ",")) !== FALSE) {
        $data[] = 'A+B';
        $newCsvData[] = $data[0]['A'] + $data[0]['B'];
        echo "hi"
    }
    fclose($handle);
}

echo "array: ";
echo ['result' => json_encode($newCsvData, JSON_PRETTY_PRINT)];


$handle = fopen('../Smalloutput/smalloutput.csv', 'w');

foreach ($newCsvData as $line) {
   fputcsv($handle, $line);
}

fclose($handle);

?> 


