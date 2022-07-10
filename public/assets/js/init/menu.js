$(document).ready(function(){
  $('#menu').prepend(menu)
  $('.collapsible').collapsible();
  $(".button-collapse").sideNav();
  $(".button-collapse").css('margin', '5px');
  console.log('#menu');
  $('ul.tabs').tabs();
});

const menu = `
  <div class="col s2">
    <!-- Sidenav -->
    <ul id="slide-out" class="side-nav">
      <li>
        <div class="user-view">
          <div class="background">
            <img src="assets/images/capa.png">
          </div>
          <a href="#!user"><img class="circle" src="assets/images/perfil.jpg"></a>
          <a href="#!name"><span class="white-text name">Gabriel Guedes</span></a>
          <a href="#!email"><span class="white-text email">gabs@gmail.com</span></a>
        </div>
      </li>
      <li><a href="/"><i class="material-icons">home</i>Início</a></li>
      <li><a href="/meu-perfil"><i class="material-icons">person</i>Meu perfil</a></li>
      <li><a href="/categorias"><i class="material-icons">burst_mode</i>Categorias</a></li>
      <li><a href="/meus-ganhos"><i class="material-icons">attach_money</i>Meus Ganhos</a></li>
      <li><a href="/personalizar"><i class="material-icons">color_lens</i>Personalizar</a></li>
      <li><div class="divider"></div></li>
      <li><a href="/configuracoes" class=""><i class="material-icons">settings</i>Configurações</a></li>
      <li><a href="/sair" class="waves-effect"><i class="material-icons">input</i>Sair</a></li>
    </ul>

    <a href="#" data-activates="slide-out" class="btn-floating btn-large waves-effect waves-light red button-collapse">
      <i class="medium material-icons">menu</i>
    </a>
  </div>
  <div class="col s10">
    <ul class="tabs">
      <li class="tab col s3"><a href="">Todas</a></li>
      <li class="tab col s3"><a class="active" href="">APTO</a></li>
      <li class="tab col s3"><a href="">Pessoais</a></li>
      <li class="tab col s3"><a href="">Streaming</a></li>
    </ul>
  </div>
  `