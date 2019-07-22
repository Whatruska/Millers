<?php
  require_once 'connectToDB.php';

  function showAllUsers($pdo){
    $query = $pdo->query('SELECT * FROM `users` ORDER BY `email` DESC');
    while ($row = $query->fetch(PDO::FETCH_OBJ)) {
        echo '<b>Name : '.$row->name.'<br></b>';
        echo 'Surname : '.$row->surname.'<br>';
        echo 'Email : '.$row->email.'<br>';
        echo 'Login : '.$row->login.'<br>';
        echo '*****************'.'<br>';
    }
  };

  function showArticles($pdo){
    $query = $pdo->query('SELECT * FROM `articles` ORDER BY `date` DESC');
    while ($article = $query->fetch(PDO::FETCH_OBJ)) {
      echo "<div class ='article-list-item'>";
        echo"<div class ='article article-title'>";
          echo $article->title;
        echo"</div>";
        echo"<div class ='article article-intro'>";
          echo $article->intro;
        echo"</div>";
        echo"<div class ='article article-author'>";
          echo "by ".$article->author;
        echo"</div>";
        echo"<button type='submit' class ='article btn article-btn' name ='".$article->id."'>";
          echo "Читать больше..";
        echo"</button>";
      echo"</div>";
    };
  };

  function getArticleByID($pdo, $ID){
    $sql = 'SELECT * FROM `articles` WHERE `id` = ?';
    $query = $pdo->prepare($sql);
    $query->execute([$ID]);
    return $query->fetch(PDO::FETCH_OBJ);
  };
 ?>
