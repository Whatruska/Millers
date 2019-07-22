<?php
  $user = 'root';
  $password = 'root';
  $host = 'localhost';
  $dbname = 'cources';

  $dsn = 'mysql:host='.$host.';dbname='.$dbname;

  $pdo = new PDO($dsn, $user);
 ?>
