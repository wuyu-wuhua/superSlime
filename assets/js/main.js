// 当前语言
let currentLang = 'en';

// 初始化语言设置
document.addEventListener('DOMContentLoaded', () => {
    // 从本地存储获取上次使用的语言
    const savedLang = localStorage.getItem('preferred_language');
    if (savedLang) {
        currentLang = savedLang;
        updateLanguage(currentLang);
    }

    // 为所有语言按钮添加点击事件
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            currentLang = lang;
            localStorage.setItem('preferred_language', lang);
            updateLanguage(lang);
        });
    });
});

// 更新页面语言
function updateLanguage(lang) {
    // 更新所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    // 更新页面标题
    document.title = translations[lang]['home-title'];

    // 更新语言按钮的激活状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// 响应式 iframe 处理
function handleResponsiveIframe() {
    const iframe = document.querySelector('iframe');
    if (iframe) {
        // 设置初始高度
        const aspectRatio = 9/16;
        const width = iframe.offsetWidth;
        iframe.style.height = `${width * aspectRatio}px`;
        
        // 监听窗口大小变化
        window.addEventListener('resize', () => {
            const newWidth = iframe.offsetWidth;
            iframe.style.height = `${newWidth * aspectRatio}px`;
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    handleResponsiveIframe();
    
    // 添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// 添加页面加载动画
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// 语言切换功能
function initLanguageSwitcher() {
    const languageButtons = document.querySelectorAll('.language-switcher button');
    const currentLang = localStorage.getItem('language') || 'en';
    
    // 设置初始语言
    setLanguage(currentLang);
    
    // 为每个语言按钮添加点击事件
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            setLanguage(lang);
            localStorage.setItem('language', lang);
        });
    });
}

// 设置页面语言
function setLanguage(lang) {
    // 更新所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // 更新页面标题
    document.title = translations[lang]['about-title'] || 'About Us - Super Slime';
    
    // 更新语言按钮的激活状态
    document.querySelectorAll('.language-switcher button').forEach(button => {
        if (button.getAttribute('data-lang') === lang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher();
    // ... existing code ...
}); 