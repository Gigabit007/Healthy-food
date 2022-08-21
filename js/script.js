const nav = document.querySelector('.header');
const intro = document.querySelector(".intro");
const introH = intro.clientHeight;
const navBtn = document.querySelector('.nav__btn');
const navList = document.querySelector('.nav__list')
const navitem = document.querySelectorAll('.nav__item')
const recipesItems = document.querySelectorAll('.recipes__item');
const removeBtn = document.querySelectorAll('.item__return');
let animItems = document.querySelectorAll('.anim');



function fixedNav() {
    if( pageYOffset > introH / 2) {
        nav.classList.add('fixed');
    }
    else {
        nav.classList.remove('fixed')
    }
};

document.addEventListener('DOMContentLoaded', () => {
    let slider = $(".about__slider");
    slider.slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        fade: false,
        arrows: true,
        responsive: [
            {
            breakpoint: 840,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                }
            }
        ]
    });
})


function navToggle() {
    navList.classList.toggle('active');
    navBtn.classList.toggle('active');
};

recipesItems.forEach(function(item) {
    item.addEventListener('click', function(){
        recipesItems.forEach(function(item) {
            item.classList.remove('active')
        })
        if(item.classList.contains('active__btn')) {
            item.classList.remove('active__btn');
            return true;
        }
        if(item.classList.contains('active')) {
            item.classList.remove('active');
            
        }
        item.classList.add('active');
    })
});
removeBtn.forEach(function(btn) {
    btn.addEventListener('click', () => {
        recipesItems.forEach(function(item) {
            item.classList.remove('active')
            btn.parentElement.classList.add('active__btn')
        })
    })
});

navitem.forEach(function(item) {
    document.addEventListener('scroll', () => {
        const id = item.getAttribute('href');
        const blockId = document.querySelectorAll('' + id)
        blockId.forEach(function(block) {
            let top = window.scrollY;
            let offset = block.offsetTop;
            let height = block.offsetHeight;
            if(top >= offset && top < offset + height) {
                navitem.forEach(function(item) {
                    item.classList.remove('active')
                })
                item.classList.add('active')
                
            } else {
                item.classList.remove('active')
            }
        })
        
    })
        

})
if(animItems.length > 0) {
    document.addEventListener('scroll', anim);
    function anim() {
        for(let i = 0; i < animItems.length; i++) {
            let item = animItems[i];
            let offsett = offset(item).top
            let height = item.offsetHeight;
            let windowCenter = (window.innerHeight / 2) + window.scrollY;
            
            if(offsett < windowCenter) {
                item.classList.add('_active');
            }
            if(windowCenter > offsett && windowCenter < (offsett + height) ) {
                item.classList.add('_active');
                
            } 
        }
    }
    function offset(el) {
        var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
}
if(navitem.length > 0){
    for(let i = 0; i < navitem.length; i++) {
        let item = navitem[i];
        item.addEventListener('click', event => {
            event.preventDefault();
            const blockId = item.getAttribute('href')
            
            document.querySelector(`${blockId}`).scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
            
        })
    }
}

setTimeout(anim, 500)

navBtn.addEventListener('click', navToggle)
document.addEventListener('scroll', () => {
    
    fixedNav();
    
});
fixedNav()
