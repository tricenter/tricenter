<?php

/**
 * Crea los Json para la App del catágolo de TRICENTER
 */

require 'vendor/autoload.php';
$app = new Slim\App();
function getDB(){

	$dbhost = "185.2.4.86";
	$dbname = "ou27em59_tricaja";
	$dbuser = "ou27em59_tricaja";
	$dbpass = "tri+center01";

	$mysql_conn_string = "mysql:host=$dbhost;dbname=$dbname" . ";charset=utf8"; 
	$dbConnection = new PDO($mysql_conn_string, $dbuser, $dbpass);
	$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbConnection;
}

$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome!");
    return $response;
});

$app->get('/tema', function ($request, $response, $args) {
	try{
		$Strin = "";
		$db = getDB();
		$db2 = getDB();


		$sth = $db->prepare("SELECT DISTINCT ARTICULOS_TEMA FROM ARTICULOS");
		$sth->execute();

		$rs = $sth->fetchAll(PDO::FETCH_ASSOC);
		
		$Strin = '[' ;
		$Strin = $Strin . '';
		foreach($rs as $row2) {

			$Strin = $Strin . '{"ARTICULOS_TEMA": "' . $row2['ARTICULOS_TEMA'] . '",';

			
			
			$sth2 = $db2->prepare("SELECT ARTICULOS_IMAGEN FROM ARTICULOS WHERE ARTICULOS_TEMA = '" . $row2['ARTICULOS_TEMA'] . "' LIMIT 10");
			$sth2->execute();
			$rsArt = $sth2->fetchAll(PDO::FETCH_ASSOC);
			foreach($rsArt as $row) {
				if (strstr($row['ARTICULOS_IMAGEN'], '.jpg')) {
					$Strin = $Strin . '"ARTICULOS_IMAGEN": "http://www.tricenter.es/images/stories/virtuemart/product/p/' . $row['ARTICULOS_IMAGEN'] . '"';					
					break;
				} else {
					
				}

				
			}
			$Strin = $Strin . "},";
		}
		$Strin = trim($Strin, ',');
		$Strin = $Strin . "]";
		$db = null;
		$db2 = null;
		$response->write($Strin);

	} catch(PDOException $e){
		$response->write('{"error":{"texto":'.$e->getMessage().'}}');
	}
    
    return $response;
});

$app->get('/subtema/{id}', function ($request, $response, $args) {
	try{
		$Strin = "";
		$db = getDB();
		$db2 = getDB();
		$db3 = getDB();

		$SqlString = "SELECT DISTINCT ARTICULOS_SUBTEMA FROM ARTICULOS WHERE ARTICULOS_TEMA = '" . $args['id'] .  "'";
		$sth = $db->prepare($SqlString);
		$sth->execute();
		$rs = $sth->fetchAll(PDO::FETCH_ASSOC);
		
		$Strin = '[' ;
		$Strin = $Strin . '';
		foreach($rs as $row2) {
			$Strin = $Strin . '{"ARTICULOS_SUBTEMA": "' . trim($row2['ARTICULOS_SUBTEMA']," ") . '",';

			$sth3 = $db3->prepare("SELECT ARTICULOS_CODIGO FROM ARTICULOS WHERE ARTICULOS_SUBTEMA = '" .  trim($row2['ARTICULOS_SUBTEMA']," ")  . "'");
			$sth3->execute();
			$rsCount = $sth3->rowCount();			
			
			$Strin = $Strin . '"ARTICULOS_COUNT": "' . $rsCount . '",';


			$sth2 = $db2->prepare("SELECT ARTICULOS_IMAGEN FROM ARTICULOS WHERE ARTICULOS_SUBTEMA = '" .  trim($row2['ARTICULOS_SUBTEMA']," ")  . "' LIMIT 10");
			$sth2->execute();
			$rsArt = $sth2->fetchAll(PDO::FETCH_ASSOC);
			foreach($rsArt as $row) {
				if (strstr($row['ARTICULOS_IMAGEN'], '.jpg')) {
					$Strin = $Strin . '"ARTICULOS_IMAGEN": "http://www.tricenter.es/images/stories/virtuemart/product/p/' . $row['ARTICULOS_IMAGEN'] . '"';					
					break;
				} else {
					
				}
			}
			$Strin = $Strin . "},";
		}
		$Strin = trim($Strin, ',');
		$Strin = $Strin . "]";
		$db = null;
		$db2 = null;
		$db3 = null;
		$response->write($Strin);

	} catch(PDOException $e){
		
		$response->write($SqlString . "<br>" . '{"error":{"texto":'.$e->getMessage().'}}');
	}
    
    return $response;


	});


$app->get('/listart/{subtema}', function ($request, $response, $args) {
	try{
		$Strin = "";
		$db = getDB();
		$db2 = getDB();
		
		$SqlString = "SELECT ARTICULOS_CODIGO,ARTICULOS_DESNORMAL,ARTICULOS_IMAGEN FROM ARTICULOS WHERE ARTICULOS_SUBTEMA = '" . trim($args['subtema'], " ") .  "'";
		$sth = $db->prepare($SqlString);
		$sth->execute();
		$rs = $sth->fetchAll(PDO::FETCH_ASSOC);
		
		$Strin = '[' ;
		$Strin = $Strin . '';
		foreach($rs as $row2) {
			$Strin = $Strin . '{"ARTICULOS_CODIGO": "' . $row2['ARTICULOS_CODIGO'] . '",';
			$Strin = $Strin . '"ARTICULOS_DESNORMAL": "' . $row2['ARTICULOS_DESNORMAL'] . '",';
			$Strin = $Strin . '"ARTICULOS_IMAGEN": "http://www.tricenter.es/images/stories/virtuemart/product/p/' . $row2['ARTICULOS_IMAGEN'] . '"';					
			$Strin = $Strin . "},";
		}
		$Strin = trim($Strin, ',');
		$Strin = $Strin . "]";
		$db = null;
		$db2 = null;
		$response->write($Strin);

	} catch(PDOException $e){
		
		$response->write($SqlString . "<br>" . '{"error":{"texto":'.$e->getMessage().'}}');
	}
    
    return $response;


	});



$app->get('/articulo/{id}', function ($request, $response, $args) {
	try{
		$db = getDB();
		$sth = $db->prepare("SELECT * FROM avistamientos WHERE id = :id");
		$sth->bindParam(":id",  $args["id"], PDO::PARAM_INT);
		$sth->execute();
		$pajaros = $sth->fetchAll(PDO::FETCH_ASSOC);
		if($pajaros){
			$response = $response->withJson($pajaros );
			$db = null;
		}

	} catch(PDOException $e){
		$response->write('{"error":{"texto":'.$e->getMessage().'}}');
	}
    
    return $response;
});


$app->put('/updateVeces', function ($request, $response) {
	try{
		$data = $request->getParams();
		$db = getDB();
		$sth = $db->prepare("UPDATE avistamientos SET veces=?, lastView=? where id=?");

		$sth->execute(array($data["veces"], $data["lastView"], $data["id"]));
		$response->write('{"error":"ok"}');
	} catch(PDOException $e){
		$response->write('{"error":{"texto":'.$e->getMessage().'}}');
	}
    
    return $response;
});


$app->put('/update', function ($request, $response) {
	try{
		$data = $request->getParams();
		$db = getDB();
		$sth = $db->prepare("UPDATE avistamientos SET titulo=?, pajaro=? where id=?");

		$sth->execute(array($data["titulo"], $data["pajaro"], $data["id"]));
		$response->write('{"error":"ok"}');
	} catch(PDOException $e){
		$response->write('{"error":{"texto":'.$e->getMessage().'}}');
	}
    
    return $response;
});



$app->post('/add', function ($request, $response) {
	try{
		$data = $request->getParams();
		$db = getDB();
		$sth = $db->prepare("INSERT INTO avistamientos 
										(titulo, pajaro, lastView, veces, latitud, longitud)
										VALUES (?,?,?,?,?,?)");

		$sth->execute(array($data["titulo"], $data["pajaro"], $data["lastView"], $data["veces"], $data["latitud"], $data["longitud"]));
		$response->write('{"error":"ok"}');
	} catch(PDOException $e){
		$response->write('{"error":{"texto":'.$e->getMessage().'}}');
	}
    
    return $response;
});



$app->delete('/delete/{id}', function ($request, $response, $args) {
	try{
		$db = getDB();
		$sth = $db->prepare("DELETE FROM avistamientos where id=:id");
		$sth->bindParam(":id",  $args["id"], PDO::PARAM_INT);
		$sth->execute();
		$response->write('{"error":"ok"}');
	} catch(PDOException $e){
		$response->write('{"error":{"texto":'.$e->getMessage().'}}');
	}
    
    return $response;
});

/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
