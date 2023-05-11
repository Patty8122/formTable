<?php
header('Access-Control-Allow-Origin: https://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST');
// php function to convert csv to json format
function csvToJson($fname)
{
    // open csv file
    if (!($fp = fopen($fname, 'r'))) {
        die("Can't open file...");
    }

    // read csv headers and rename columns
    $headers = fgetcsv($fp, "1024", ",");

    $headers = array_map(function ($header) {
        return strtolower(str_replace(" ", "_", $header));
    }, $headers);
    $headers = str_replace("pair number", "pair_number", $headers);
    // $headers = str_replace("a+b", "aplusb", $headers);
    // parse csv rows into array
    $json = array();
    while ($row = fgetcsv($fp, "1024", ",")) {
        $json[] = array_combine($headers, $row);
    }


    // release file handle
    fclose($fp);

    // encode array to json
//     echo json_encode($json, JSON_PRETTY_PRINT);
    return ['result' => json_encode($json, JSON_PRETTY_PRINT)];
}
?>



<?php
header('Access-Control-Allow-Origin: https://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST');


// read the data from the csv file without pandas

// if get request, return the data
    $json_file = csvToJson("../Input/input.csv");

    // convert the json string to an array
    $json_file = json_decode($json_file['result'], true);
    
    //  for each element in the array add a new key value pair

    
    foreach ($json_file as $i => $value) {
        $json_file[$i]['aplusb'] = $json_file[$i]['a'] + $json_file[$i]['b'];
    }
    

    echo json_encode($json_file, JSON_PRETTY_PRINT);
    // send the data to the client
    // echo $json_file; 



?>