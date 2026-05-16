/* =============================================
   CRYPTO SAVINGS TRACKER — SCRIPT.JS
   ============================================= */

/* =====================
   DUMMY DATA TRANSAKSI
   ===================== */
let transactions = [
  {
    id: 1,
    date: '2026-01-15',
    asset: 'BTC',
    type: 'Buy',
    amount: 0.003,
    price: 850000000,
    total: 2550000,
    fee: 20000,
    platform: 'Indodax',
    note: 'DCA bulan Januari'
  },
  {
    id: 2,
    date: '2026-01-28',
    asset: 'ETH',
    type: 'Buy',
    amount: 0.05,
    price: 35000000,
    total: 1750000,
    fee: 12000,
    platform: 'Tokocrypto',
    note: 'Beli ETH pertama kali'
  },
  {
    id: 3,
    date: '2026-02-10',
    asset: 'SOL',
    type: 'Buy',
    amount: 5,
    price: 220000,
    total: 1100000,
    fee: 8000,
    platform: 'Pintu',
    note: 'Diversifikasi ke Solana'
  },
  {
    id: 4,
    date: '2026-02-20',
    asset: 'BTC',
    type: 'Buy',
    amount: 0.003,
    price: 870000000,
    total: 2610000,
    fee: 22000,
    platform: 'Indodax',
    note: 'DCA bulan Februari'
  },
  {
    id: 5,
    date: '2026-03-05',
    asset: 'USDT',
    type: 'Deposit',
    amount: 100,
    price: 16000,
    total: 1600000,
    fee: 5000,
    platform: 'Binance',
    note: 'Top up USDT untuk trading'
  },
  {
    id: 6,
    date: '2026-03-18',
    asset: 'ETH',
    type: 'Buy',
    amount: 0.05,
    price: 34000000,
    total: 1700000,
    fee: 12000,
    platform: 'Tokocrypto',
    note: 'DCA ETH - harga turun'
  },
  {
    id: 7,
    date: '2026-04-03',
    asset: 'SOL',
    type: 'Buy',
    amount: 8,
    price: 215000,
    total: 1720000,
    fee: 9000,
    platform: 'Pintu',
    note: 'Tambah posisi SOL'
  },
  {
    id: 8,
    date: '2026-04-20',
    asset: 'BTC',
    type: 'Staking Reward',
    amount: 0.0008,
    price: 875000000,
    total: 700000,
    fee: 0,
    platform: 'Indodax',
    note: 'Reward staking BTC'
  }
];

/* ID counter untuk transaksi baru */
let nextId = 9;

/* =====================
   FORMAT ANGKA RUPIAH
   ===================== */
function formatRupiah(angka) {
  if (!angka && angka !== 0) return '-';
  return 'Rp ' + Number(angka).toLocaleString('id-ID');
}

/* Singkat angka besar (untuk tampilan card) */
function formatRupiahShort(angka) {
  if (angka >= 1000000000) return 'Rp ' + (angka / 1000000000).toFixed(1) + 'M';
  if (angka >= 1000000)    return 'Rp ' + (angka / 1000000).toFixed(2) + 'jt';
  if (angka >= 1000)       return 'Rp ' + (angka / 1000).toFixed(0) + 'rb';
  return 'Rp ' + angka;
}

/* =====================
   STATUS / WARNA JENIS TRANSAKSI
   ===================== */
function getTypeClass(type) {
  const map = {
    'Buy':           'type-buy',
    'Sell':          'type-sell',
    'Deposit':       'type-deposit',
    'Withdraw':      'type-withdraw',
    'Staking Reward':'type-staking',
    'Transfer In':   'type-transfer',
    'Transfer Out':  'type-transfer'
  };
  return map[type] || 'type-transfer';
}

/* =====================
   STATUS CHIP (profit / neutral)
   ===================== */
function getStatusBadge(type) {
  if (type === 'Buy' || type === 'Deposit' || type === 'Transfer In' || type === 'Staking Reward') {
    return '<span class="badge badge--success">Profit</span>';
  }
  if (type === 'Sell' || type === 'Withdraw' || type === 'Transfer Out') {
    return '<span class="badge badge--danger">Keluar</span>';
  }
  return '<span class="badge badge--neutral">Netral</span>';
}

/* =====================
   WARNA DOT ASET
   ===================== */
function getAssetDotClass(asset) {
  const map = {
    'BTC':  'dot-btc',
    'ETH':  'dot-eth',
    'SOL':  'dot-sol',
    'BNB':  'dot-bnb',
    'USDT': 'dot-usdt'
  };
  return map[asset] || 'dot-usdt';
}

/* =====================
   RENDER TABEL TRANSAKSI
   ===================== */
function renderTransactions(data) {
  const tbody = document.getElementById('transactionBody');
  const countBadge = document.getElementById('txCount');

  if (!tbody) return;

  /* Gunakan data yang diberikan, atau seluruh transactions */
  const list = data || transactions;

  /* Update badge jumlah */
  if (countBadge) {
    countBadge.textContent = list.length + ' Transaksi';
  }

  /* Update laporan jumlah transaksi */
  const reportCount = document.getElementById('reportTxCount');
  if (reportCount) {
    reportCount.textContent = transactions.length + ' Transaksi';
  }

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="10" style="text-align:center; padding:40px; color:var(--text-muted); font-size:13.5px;">
          📭 Belum ada transaksi. Tambahkan transaksi pertama Anda!
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = list.map(tx => `
    <tr id="tx-row-${tx.id}">
      <td style="color:var(--text-muted); font-size:12.5px;">${formatDate(tx.date)}</td>
      <td>
        <span class="asset-chip">
          <span class="asset-dot ${getAssetDotClass(tx.asset)}"></span>
          ${tx.asset}
        </span>
      </td>
      <td><span class="type-chip ${getTypeClass(tx.type)}">${tx.type}</span></td>
      <td style="font-weight:600; font-variant-numeric:tabular-nums;">
        ${Number(tx.amount).toLocaleString('id-ID', {maximumFractionDigits:6})}
      </td>
      <td style="font-variant-numeric:tabular-nums;">${formatRupiah(tx.price)}</td>
      <td style="font-weight:600; font-variant-numeric:tabular-nums;">${formatRupiah(tx.total)}</td>
      <td style="color:var(--text-muted);">${tx.fee > 0 ? formatRupiah(tx.fee) : '-'}</td>
      <td style="color:var(--text-muted);">${tx.platform || '-'}</td>
      <td>${getStatusBadge(tx.type)}</td>
      <td>
        <div class="table-actions">
          <button class="btn btn-edit" onclick="editTransaction(${tx.id})" title="Edit">✏️ Edit</button>
          <button class="btn btn-danger" onclick="deleteTransaction(${tx.id})" title="Hapus">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

/* =====================
   FORMAT TANGGAL
   ===================== */
function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('id-ID', { day:'2-digit', month:'short', year:'numeric' });
}

/* =====================
   TAMBAH TRANSAKSI BARU
   ===================== */
function addTransaction() {
  /* Ambil nilai dari form */
  const date     = document.getElementById('txDate').value;
  const asset    = document.getElementById('txAsset').value;
  const type     = document.getElementById('txType').value;
  const amount   = parseFloat(document.getElementById('txAmount').value);
  const price    = parseFloat(document.getElementById('txPrice').value);
  const fee      = parseFloat(document.getElementById('txFee').value) || 0;
  const platform = document.getElementById('txPlatform').value.trim();
  const note     = document.getElementById('txNote').value.trim();
  const total    = parseFloat(document.getElementById('txTotal').value) || (amount * price);

  /* Validasi field wajib */
  if (!date)            { showToast('Tanggal transaksi wajib diisi!', 'error'); highlight('txDate'); return; }
  if (!asset)           { showToast('Nama aset wajib dipilih!', 'error'); highlight('txAsset'); return; }
  if (!type)            { showToast('Jenis transaksi wajib dipilih!', 'error'); highlight('txType'); return; }
  if (!amount || amount <= 0) { showToast('Jumlah crypto harus lebih dari 0!', 'error'); highlight('txAmount'); return; }
  if (!price || price <= 0)   { showToast('Harga per koin harus lebih dari 0!', 'error'); highlight('txPrice'); return; }

  /* Buat objek transaksi baru */
  const newTx = {
    id: nextId++,
    date,
    asset,
    type,
    amount,
    price,
    total: total || (amount * price),
    fee,
    platform: platform || '-',
    note
  };

  /* Tambahkan ke array & simpan ke localStorage */
  transactions.unshift(newTx); // tambah di atas
  saveToStorage();

  /* Re-render tabel */
  renderTransactions();

  /* Animasi highlight baris baru */
  setTimeout(() => {
    const newRow = document.getElementById(`tx-row-${newTx.id}`);
    if (newRow) {
      newRow.style.background = 'rgba(34,197,94,.08)';
      newRow.style.transition = 'background 1.5s ease';
      setTimeout(() => { newRow.style.background = ''; }, 2000);
    }
  }, 100);

  /* Reset form */
  resetForm();

  /* Tampilkan toast sukses */
  showToast(`✓ Transaksi ${asset} (${type}) berhasil ditambahkan!`, 'success');

  /* Scroll ke riwayat */
  setTimeout(() => scrollToSection('riwayat'), 400);
}

/* =====================
   HAPUS TRANSAKSI
   ===================== */
function deleteTransaction(id) {
  const tx = transactions.find(t => t.id === id);
  if (!tx) return;

  if (!confirm(`Hapus transaksi ${tx.asset} (${tx.type}) pada ${formatDate(tx.date)}?\nTindakan ini tidak bisa dibatalkan.`)) return;

  /* Animasi fade-out baris */
  const row = document.getElementById(`tx-row-${id}`);
  if (row) {
    row.style.transition = 'all .3s ease';
    row.style.opacity = '0';
    row.style.transform = 'translateX(-10px)';
  }

  setTimeout(() => {
    transactions = transactions.filter(t => t.id !== id);
    saveToStorage();
    renderTransactions();
    showToast(`Transaksi ${tx.asset} berhasil dihapus.`, 'success');
  }, 300);
}

/* =====================
   EDIT TRANSAKSI (isi ulang form)
   ===================== */
function editTransaction(id) {
  const tx = transactions.find(t => t.id === id);
  if (!tx) return;

  /* Isi form dengan data transaksi */
  document.getElementById('txDate').value     = tx.date;
  document.getElementById('txAsset').value    = tx.asset;
  document.getElementById('txType').value     = tx.type;
  document.getElementById('txAmount').value   = tx.amount;
  document.getElementById('txPrice').value    = tx.price;
  document.getElementById('txTotal').value    = tx.total;
  document.getElementById('txFee').value      = tx.fee;
  document.getElementById('txPlatform').value = tx.platform !== '-' ? tx.platform : '';
  document.getElementById('txNote').value     = tx.note;

  /* Hapus transaksi lama dari daftar (akan disimpan ulang saat submit) */
  transactions = transactions.filter(t => t.id !== id);
  saveToStorage();
  renderTransactions();

  /* Scroll ke form */
  scrollToSection('tambah-transaksi');
  showToast(`Mode edit aktif untuk transaksi ${tx.asset}. Ubah data lalu simpan.`, 'info');
}

/* =====================
   RESET FORM
   ===================== */
function resetForm() {
  const fields = ['txDate','txAsset','txType','txAmount','txPrice','txTotal','txFee','txPlatform','txNote'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  /* Set tanggal hari ini sebagai default */
  const today = new Date().toISOString().split('T')[0];
  const dateEl = document.getElementById('txDate');
  if (dateEl) dateEl.value = today;
}

/* =====================
   AUTO HITUNG TOTAL MODAL
   ===================== */
function autoCalcTotal() {
  const amount = parseFloat(document.getElementById('txAmount')?.value) || 0;
  const price  = parseFloat(document.getElementById('txPrice')?.value) || 0;
  const totalEl = document.getElementById('txTotal');
  if (totalEl) {
    totalEl.value = amount > 0 && price > 0 ? (amount * price).toFixed(0) : '';
  }
}

/* =====================
   HIGHLIGHT INPUT ERROR
   ===================== */
function highlight(fieldId) {
  const el = document.getElementById(fieldId);
  if (!el) return;
  el.style.borderColor = 'var(--danger)';
  el.style.boxShadow = '0 0 0 3px rgba(239,68,68,.1)';
  el.focus();
  setTimeout(() => {
    el.style.borderColor = '';
    el.style.boxShadow = '';
  }, 2500);
}

/* =====================
   TOAST NOTIFIKASI
   ===================== */
let toastTimer = null;

function showToast(message, type = 'success') {
  const toast   = document.getElementById('toast');
  const msgEl   = document.getElementById('toastMessage');
  const iconEl  = document.getElementById('toastIcon');

  if (!toast) return;

  msgEl.textContent = message;

  /* Ikon & warna sesuai tipe */
  if (type === 'error') {
    iconEl.textContent = '✕';
    toast.classList.add('toast-error');
    toast.classList.remove('toast-info');
  } else if (type === 'info') {
    iconEl.textContent = 'ℹ';
    toast.classList.add('toast-info');
    toast.classList.remove('toast-error');
    toast.style.background = '#1E3A5F';
  } else {
    iconEl.textContent = '✓';
    toast.classList.remove('toast-error', 'toast-info');
    toast.style.background = '';
  }

  toast.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* =====================
   SCROLL KE SECTION
   ===================== */
function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (!el) return;

  const topbar = document.querySelector('.topbar');
  const topbarH = topbar ? topbar.offsetHeight : 72;
  const offset = el.getBoundingClientRect().top + window.scrollY - topbarH - 16;

  window.scrollTo({ top: offset, behavior: 'smooth' });

  /* Update nav item aktif */
  setActiveNav(sectionId);
}

/* =====================
   SET NAV AKTIF
   ===================== */
function setActiveNav(sectionId) {
  const items = document.querySelectorAll('.nav-item');
  items.forEach(item => {
    item.classList.remove('active');
    if (item.dataset.section === sectionId) {
      item.classList.add('active');
      /* Update judul halaman di topbar */
      const title = document.getElementById('pageTitle');
      if (title && item.dataset.title) title.textContent = item.dataset.title;
    }
  });
}

/* =====================
   SIDEBAR MOBILE TOGGLE
   ===================== */
function initSidebar() {
  const hamburger = document.getElementById('hamburgerBtn');
  const sidebar   = document.getElementById('sidebar');
  const overlay   = document.getElementById('sidebarOverlay');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });

  overlay?.addEventListener('click', closeSidebar);

  /* Tutup sidebar saat memilih menu di mobile */
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeSidebar();
    });
  });
}

/* =====================
   NAVIGASI SIDEBAR — SMOOTH SCROLL + ACTIVE
   ===================== */
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item[data-section]');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const sectionId = item.dataset.section;
      setActiveNav(sectionId);
      scrollToSection(sectionId);
    });
  });
}

/* =====================
   SCROLL SPY — update nav saat scroll
   ===================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const topbarH  = (document.querySelector('.topbar')?.offsetHeight || 72) + 40;

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - topbarH) {
        current = section.id;
      }
    });

    if (current) {
      document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === current) {
          item.classList.add('active');
          const title = document.getElementById('pageTitle');
          if (title && item.dataset.title) title.textContent = item.dataset.title;
        }
      });
    }
  }, { passive: true });
}

/* =====================
   PENCARIAN TRANSAKSI (search bar)
   ===================== */
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();

    if (!query) {
      renderTransactions();
      return;
    }

    const filtered = transactions.filter(tx =>
      tx.asset.toLowerCase().includes(query)   ||
      tx.type.toLowerCase().includes(query)    ||
      tx.platform.toLowerCase().includes(query)||
      (tx.note && tx.note.toLowerCase().includes(query))
    );

    renderTransactions(filtered);
  });
}

/* =====================
   FORM: auto-kalkulasi total & event listener
   ===================== */
function initForm() {
  /* Set tanggal default hari ini */
  const today = new Date().toISOString().split('T')[0];
  const dateEl = document.getElementById('txDate');
  if (dateEl && !dateEl.value) dateEl.value = today;

  /* Event listener untuk auto-hitung total */
  ['txAmount', 'txPrice'].forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('input', autoCalcTotal);
  });
}

/* =====================
   ANIMASI BAR CHART SAAT HALAMAN LOAD
   ===================== */
function animateBars() {
  const bars = document.querySelectorAll('.bar');
  bars.forEach((bar, i) => {
    const finalHeight = bar.style.height;
    bar.style.height = '0%';
    setTimeout(() => {
      bar.style.transition = 'height .7s cubic-bezier(.4,0,.2,1)';
      bar.style.height = finalHeight;
    }, 200 + i * 80);
  });
}

/* Animasi allocation bar fill */
function animateAllocBars() {
  const fills = document.querySelectorAll('.alloc-fill');
  fills.forEach((fill, i) => {
    const finalW = fill.style.width;
    fill.style.width = '0%';
    setTimeout(() => {
      fill.style.transition = 'width 1s ease';
      fill.style.width = finalW;
    }, 400 + i * 100);
  });
}

/* =====================
   LOCALSTORAGE — simpan & muat data
   ===================== */
function saveToStorage() {
  try {
    localStorage.setItem('cst_transactions', JSON.stringify(transactions));
    localStorage.setItem('cst_nextId', nextId.toString());
  } catch (e) {
    console.warn('LocalStorage tidak tersedia:', e);
  }
}

function loadFromStorage() {
  try {
    const saved = localStorage.getItem('cst_transactions');
    const savedId = localStorage.getItem('cst_nextId');

    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        transactions = parsed;
      }
    }

    if (savedId) {
      nextId = parseInt(savedId, 10) || 9;
    }
  } catch (e) {
    console.warn('Gagal memuat data dari localStorage:', e);
  }
}

/* =====================
   INIT SAAT HALAMAN LOAD
   ===================== */
document.addEventListener('DOMContentLoaded', () => {

  /* Muat data dari localStorage jika ada */
  loadFromStorage();

  /* Render tabel awal */
  renderTransactions();

  /* Inisialisasi sidebar mobile */
  initSidebar();

  /* Inisialisasi navigasi */
  initNavigation();

  /* Inisialisasi scroll spy */
  initScrollSpy();

  /* Inisialisasi form */
  initForm();

  /* Inisialisasi pencarian */
  initSearch();

  /* Animasi visual setelah halaman load */
  requestAnimationFrame(() => {
    setTimeout(animateBars, 300);
    setTimeout(animateAllocBars, 400);
  });

  console.log('✅ Crypto Savings Tracker berhasil dimuat.');
  console.log(`📊 ${transactions.length} transaksi tersedia.`);
});
