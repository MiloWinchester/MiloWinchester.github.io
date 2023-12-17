"use-strict"
const $ = document;
const careerType = $.getElementById('type-career');
const container = $.getElementById('container');
const projects = $.querySelectorAll('.project-container');
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

const setTypeLibrary = () => {
    
    let typewriter = new Typewriter(careerType, {
        loop: true
    });

    typewriter.typeString('Web Developer')
        .pauseFor(2000)
        .deleteAll()
        .typeString('Front-end Developer')
        .pauseFor(2000)
        .deleteAll()
        .typeString('Solidity Developer')
        .pauseFor(2000)
        .start();
}

const setAosLibrary = () => {
    AOS.init();
}

const changeLinksAOS = () => {
    let links = [telegramLink, instagramLink, mailLink, websiteLink];

    if (window.screen.availWidth <= 600) {

        links.map(link => {
            link.dataset.aos = 'zoom-in';
        })

    }
}

const setModalProjectData = (project, target) => {
    let projectNo = target.dataset.project;
    if (project.dataset.project === projectNo) {
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

const showNavList = () => {
    navList.classList.remove('hide-navlist');
    navList.classList.remove('slide-out-blurred-top')
    navList.classList.add('show-navlist')
    navList.classList.add('slide-in-blurred-top');
}

const hideNavList = () => {
    navList.classList.remove('show-navlist');
    navList.classList.remove('slide-in-blurred-top')
    navList.classList.add('hide-navlist')
    navList.classList.add('slide-out-blurred-top');
}

window.addEventListener('DOMContentLoaded', () => {
    setTypeLibrary();
    setAosLibrary();
    changeLinksAOS();
})

projects.forEach(project => {
    project.addEventListener('click', event => {
        setModalProjectData(project, event.target);
    })
    
})

closeModalBtn.addEventListener('click', () => {
    closeModal()
})

menuBtn.addEventListener('click', () => {
    showNavList();
})
