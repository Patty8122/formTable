<?php
header('Access-Control-Allow-Origin: http://www.convb.com');
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
    $headers = str_replace("a+b", "aplusb", $headers);
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
header('Access-Control-Allow-Origin: http://www.convb.com');
header('Access-Control-Allow-Methods: GET, POST');


// read the data from the csv file without pandas

// if get request, return the data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $json_file = csvToJson("../Output/output.csv");
	
    echo $json_file['result'];  
    // send the data to the client
    // echo $json_file; 
}

?>