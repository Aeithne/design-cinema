document.addEventListener('DOMContentLoaded', function() {
    // Função para mostrar uma seção e esconder as outras
    function showSection(sectionId) {
        // Esconde todas as seções
        document.querySelectorAll('section').forEach(function(section) {
            section.classList.remove('active-section');
            section.classList.add('hidden-section');
        });

        // Mostra a seção desejada
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden-section');
            targetSection.classList.add('active-section');
            // Opcional: Rola a janela para o topo da seção ativa, se necessário
            // window.scrollTo({
            //     top: targetSection.offsetTop - document.getElementById('mainNavbar').offsetHeight,
            //     behavior: 'smooth'
            // });
        }

        // Atualiza o link ativo na navbar
        document.querySelectorAll('.navbar-nav .nav-link').forEach(function(link) {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });

        const activeNavLink = document.querySelector(`.navbar-nav .nav-link[data-section-id="${sectionId}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
            activeNavLink.setAttribute('aria-current', 'page');
        }
        
        // Fechar o menu hambúrguer após clicar em um link (apenas em mobile)
        const navbarCollapse = document.getElementById('navbarNav');
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse && navbarCollapse.classList.contains('show')) {
            bsCollapse.hide();
        }
    }

    // Adiciona evento de clique para os links da navbar
    document.querySelectorAll('.navbar-nav .nav-link').forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Evita o comportamento padrão do link
            const sectionId = this.dataset.sectionId;
            showSection(sectionId);
        });
    });

    // Adiciona evento de clique para os botões de navegação
    document.querySelectorAll('.navigate-btn').forEach(function(button) {
        button.addEventListener('click', function(event) {
            const targetSectionId = this.dataset.targetSection;
            showSection(targetSectionId);
        });
    });

    // Função para o clique no "navbar-brand" (Meu Cine Universo)
    const navbarBrand = document.querySelector('.navbar-brand[data-section-id]');
    if (navbarBrand) {
        navbarBrand.addEventListener('click', function(event) {
            event.preventDefault();
            const sectionId = this.dataset.sectionId;
            showSection(sectionId);
        });
    }

    

    // Garante que a primeira seção (Hero) esteja visível ao carregar a página
    showSection('hero');
});

