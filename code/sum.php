
<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST');


// if post request, save the data
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // save the data to the csv file
        $myfile = fopen("../Input/input.csv", "w") or die("Unable to open file!");
        

        // // get the form data fetched by ajax in the example.js file
        // $json_str = json_decode($_POST['data'], true);
        // echo $json_str;
        // $data = $json_str['data'];
        // echo $data;

        // // check if the data is not empty and is an array
        // if (!empty($data) && is_array($data)) {
        //     $data_str = implode(",", $data);
        //     fwrite($myfile, $data_str);
        // } else {
        //     $default_data = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
        //     fwrite($myfile, $default_data);
        // }
        
        // // save the json data to the csv file
        // fclose($myfile);
        
    // get the data from the request body
    $json_str = file_get_contents('php://input');
    $data = json_decode($json_str, true);

    // why is data not an array?
    echo $data;
    echo $json_str;



    // check if the data is not empty and is an array
    if (!empty($data)) {
        // add header as Pair NUmber, a,b to the csv file
        echo "hello";
        $header = array("Pair Number", "A", "B");
        fputcsv($myfile, $header);

        // convert the data into a php array
        $data = json_decode($data, true);


        // using fputcsv() function to write the data in csv file after removing last column not row
        $data = array_map(function ($row) {
            return $row;
        }, $data);

        echo $data;
        foreach ($data as $row) {
            echo $row;
            echo "hi";
            array_pop($row);
            fputcsv($myfile, $row);
        }

        
    } else {
        echo "hi";
        $default_data = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
        fwrite($myfile, $default_data);
    }
    

    // save the json data to the csv file
    fclose($myfile);
}
?>