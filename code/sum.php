
<?php
header('Access-Control-Allow-Origin: http://www.convb.com');
header('Access-Control-Allow-Methods: GET, POST');

// handle for csv file
$myfile = fopen("../Input/input.csv", "w") or die("Unable to open file!");
echo "hi";

$newCsvData = array();
if (($handle = fopen("test.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($myfile, 1000, ",")) !== FALSE) {
        $data[] = 'A+B';
        $newCsvData[] = $data[0]['A'] + $data[0]['B'];
        echo strval($newCsvData);
    }
    fclose($handle);
}

echo "array: ";
echo strval($newCsvData);


$handle = fopen('../Smalloutput/smalloutput.csv', 'w');

foreach ($newCsvData as $line) {
   fputcsv($handle, $line);
}

fclose($handle);

?> 


