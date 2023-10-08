<?php 
    $arch = fopen("products.json", "r");

    if($arch){
        $data = fread($arch, filesize("products.json"));
        fclose($arch);
        header('Content-Type: application/json; charset=utf-8');
        echo $data;
    }
    else{
        echo "Error al abrir el archivo";
    }
    
?>