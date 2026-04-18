const DonateApp = {
  state: {
    selectedPackage: null,
    toastTimeout: null,
  },

  init: function() {
    this.initDonateButtons();
    this.initNavToggle();
    this.setupScrollAnimations();
  },

  initDonateButtons: function() {
    const donateButtons = document.querySelectorAll('.donate-btn');
    donateButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const amount = btn.dataset.amount;
        const product = btn.dataset.product;
        
        if (amount) {
          this.handleDonation(amount, btn.textContent);
        } else if (product) {
          this.handleMerch(product, btn.textContent);
        }
      });
    });
  },

  handleDonation: function(amount, label) {
    // В реальном приложении здесь была бы интеграция с платёжной системой
    // Сейчас просто показываем уведомление
    window.localStorage.setItem('siteofsotik-last-donation', JSON.stringify({
      amount: amount,
      timestamp: new Date().toISOString(),
      type: 'donation'
    }));

    this.showToast(`Спасибо! Вы выбрали поддержку на ${amount}₽. Сейчас вы перейдёте на страницу оплаты.`, 'success');
    
    // Имитация переход к платежу (в реальности будет integratio с ЮКассой/Яндекс.Касса)
    setTimeout(() => {
      // window.location.href = 'https://payment-system.example.com/pay?amount=' + amount;
      console.log('Переход на платёж: ' + amount + '₽');
    }, 2000);
  },

  handleMerch: function(product, label) {
    window.localStorage.setItem('siteofsotik-merch-interest', JSON.stringify({
      product: product,
      timestamp: new Date().toISOString(),
      type: 'merch'
    }));

    this.showToast(`Отлично! Товар добавлен в корзину. Оформляем заказ...`, 'success');
    
    setTimeout(() => {
      this.showToast(`Спасибо за заказ! Ссылка на оформление отправлена на почту.`, 'info');
    }, 1500);
  },

  initNavToggle: function() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.main-nav');
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open');
    });
  },

  setupScrollAnimations: function() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.package-card, .merch-card, .testimonial-card, .faq-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  },

  showToast: function(message, status = 'info') {
    const toast = document.querySelector('#toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.add('is-visible');
    toast.style.borderColor = status === 'error' 
      ? 'rgba(255, 59, 59, 0.45)' 
      : status === 'success' 
        ? 'rgba(0, 216, 255, 0.45)' 
        : 'rgba(255, 255, 255, 0.12)';
    
    clearTimeout(this.state.toastTimeout);
    this.state.toastTimeout = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3500);
  },
};

window.addEventListener('DOMContentLoaded', () => DonateApp.init());
