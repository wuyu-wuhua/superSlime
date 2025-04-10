// 国际化功能实现
class I18n {
    constructor() {
        // 默认语言
        this.defaultLang = 'en';
        // 当前语言
        this.currentLang = localStorage.getItem('language') || this.defaultLang;
        // 初始化
        this.init();
    }

    // 初始化
    init() {
        // 设置初始语言
        this.setLanguage(this.currentLang);
        // 绑定语言切换按钮事件
        this.bindLanguageButtons();
    }

    // 设置语言
    setLanguage(lang) {
        if (!translations[lang]) {
            console.error(`Language ${lang} not found`);
            return;
        }
        
        // 更新当前语言
        this.currentLang = lang;
        // 保存到本地存储
        localStorage.setItem('language', lang);
        
        // 更新所有需要翻译的元素
        this.updateContent();
        
        // 更新语言按钮状态
        this.updateLanguageButtons();
    }

    // 获取翻译文本
    getText(key) {
        return translations[this.currentLang][key] || key;
    }

    // 更新页面内容
    updateContent() {
        // 更新所有带有 data-i18n 属性的元素
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                element.placeholder = this.getText(key);
            } else {
                element.textContent = this.getText(key);
            }
        });

        // 更新所有带有 data-i18n-title 属性的元素
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.getText(key);
        });
    }

    // 绑定语言切换按钮事件
    bindLanguageButtons() {
        document.querySelectorAll('.language-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                this.setLanguage(lang);
            });
        });
    }

    // 更新语言按钮状态
    updateLanguageButtons() {
        document.querySelectorAll('.language-btn').forEach(button => {
            const lang = button.getAttribute('data-lang');
            if (lang === this.currentLang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
}

// 创建国际化实例
const i18n = new I18n();

// 导出实例
window.i18n = i18n; 