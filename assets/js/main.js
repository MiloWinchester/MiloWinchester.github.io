"use-strict"
const $ = document;
const careerType = $.getElementById('type-career');
const container = $.getElementById('container');
const projects = $.querySelectorAll('.project-container');
const detailsBtns = $.querySelectorAll('.details-btn')
const modalProject = $.querySelector('.project-modal');
const modalImg = $.querySelector('.modal-project-img');
const modalTitle = $.querySelector('.modal-project-title');
const modalDate = $.querySelector('.modal-project-date');
const modalDescrip = $.querySelector('.modal-project-description');
const modalSkills = $.querySelector(`.modal-project-skills`);
const closeModalBtn = $.querySelector('.close-btn');
const telegramLink = $.getElementById('telegram');
const instagramLink = $.getElementById('instagram');
const mailLink = $.getElementById('mail');
const websiteLink = $.getElementById('website');
const menuBtn = $.getElementById('menu-btn');
const navList = $.getElementById('navlist');
const menuIcon = $.querySelector('.menu-icon')

const setTypeLibrary = () => {

    let typeWriter = new TypeIt(careerType, {
        loop: true,
        speed: 100
    }).go()

    typeWriter.type("Web Developer")
        .pause(2500)
        .move(-10)
        .delete()
        .type('Front-end')
        .pause(2500)
        .move(10)
        .delete()
        .type('UI/UX Designer')
        .pause(2000)
        .delete()
        .type('Solidity Developer')
        .pause(2000)
        .delete()
        .go()
}

const setAosLibrary = () => {
    AOS.init();
}

const responsiveLayout = () => {
    let links = [telegramLink, instagramLink, mailLink, websiteLink];

    if (window.screen.availWidth <= 600) {

        links.map(link => {
            link.dataset.aos = 'zoom-in';
        })

        navList.classList.add('hide-navlist')
    }
}

const setModalProjectData = projectNumber => {
    projects.forEach(project => {
        if (project.dataset.number === projectNumber) {
            const projectId = project.id;
            const img = $.querySelector(`#${projectId} .project-img`)
            const title = $.querySelector(`#${projectId} .project-title`)
            const date = $.querySelector(`#${projectId} .project-date`)
            const description = $.querySelector(`#${projectId} .project-description`);
            const skills = $.querySelectorAll(`#${projectId} .project-skill p`);
            
            modalImg.setAttribute('src', img.getAttribute('src'));
            modalTitle.textContent = title.textContent;
            modalDate.textContent = date.textContent;
            modalDescrip.textContent = description.textContent;
    
            modalSkills.innerHTML = '';
            
            skills.forEach(skill => {
                let modalSkillContainer = $.createElement('div');
                modalSkillContainer.classList.add('modal-project-skill');
    
                let modalSkill = $.createElement('p');
                modalSkill.textContent = skill.textContent;
    
                modalSkillContainer.append(modalSkill);
                modalSkills.append(modalSkillContainer)
            })
    
            showModal();
        }
    })
}

const showModal = () => {
    modalProject.classList.remove('fade-out', 'close-project')
    modalProject.classList.add('scale-in-center', 'show-project');
    container.classList.add('blur')
}

const closeModal = () => {
    modalProject.classList.remove('scale-in-center', 'show-project');
    modalProject.classList.add('fade-out', 'close-project');
    container.classList.remove('blur')
}

const checkMenu = () => {
    if (menuIcon.className.includes('staggered')) {
        menuIcon.className = 'fa-solid fa-xmark menu-icon';
        showNavList();
    }else {
        menuIcon.className = 'fa-solid fa-bars-staggered menu-icon';
        hideNavList();
    }
}

const showNavList = () => {
    navList.classList.remove('hide-navlist');
    navList.classList.remove('slide-out-blurred-top')
    navList.classList.add('show-navlist')
    navList.classList.add('slide-in-blurred-top');
}

const hideNavList = () => {
    navList.classList.remove('show-navlist');
    navList.classList.remove('slide-in-blurred-top')
    navList.classList.add('slide-out-blurred-top');

    setTimeout(() => {
        navList.classList.add('hide-navlist')
    }, 1000);
}

window.addEventListener('DOMContentLoaded', () => {
    setTypeLibrary();
    setAosLibrary();
    responsiveLayout();
})

detailsBtns.forEach(btn => {
    btn.addEventListener('click', event => {
        setModalProjectData(event.target.dataset.number);
    })
    
})

closeModalBtn.addEventListener('click', () => {
    closeModal()
})

menuBtn.addEventListener('click', () => {
    checkMenu();
})
