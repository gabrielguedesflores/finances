$(document).ready(function(){
  console.log('menu.js');
  $('#menu').prepend(menu)
  $('.collapsible').collapsible();
  $(".button-collapse").sideNav();
  $(".button-collapse").css('margin', '5px');
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
          <a href="#!user"><img class="circle" src="assets/images/image-profile/1.jpg"></a>
          <a href="#!name"><span class="white-text name">Gabriel Guedes</span></a>
          <a href="#!email"><span class="white-text email">gabs@gmail.com</span></a>
        </div>
      </li>
      <li><a href="/" class="waves-effect"><i class="material-icons">home</i>Início</a></li>
      <li><a href="/meu-perfil" class="waves-effect"><i class="material-icons">person</i>Meu perfil</a></li>
      <li><a href="/categorias" class="waves-effect"><i class="material-icons">burst_mode</i>Categorias</a></li>
      <li><a href="/meus-ganhos" class="waves-effect"><i class="material-icons">attach_money</i>Meus Ganhos</a></li>
      <li><a href="/personalizar" class="waves-effect"><i class="material-icons">color_lens</i>Personalizar</a></li>
      <li><div class="divider"></div></li>
      <li><a href="/configuracoes" class="waves-effect"><i class="material-icons">settings</i>Configurações</a></li>
      <li><a href="/sair" class="waves-effect"><i class="material-icons">input</i>Sair</a></li>
    </ul>

    <a href="#" data-activates="slide-out" class="btn-floating btn-large waves-effect waves-light red button-collapse">
      <i class="medium material-icons">menu</i>
    </a>
  </div>
  <div class="input-field col s9">
    <select id="selectFilter" name="selectFilter">
      <option value="" selected>Filtrar despesas por categorias...</option>
    </select>
  </div>
  `