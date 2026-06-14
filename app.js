// Access Gate Authentication Configuration
const AUTH_CONFIG = {
  email: "admin@overallmedical.com",
  password: "OverallAdmin2026"
};

// Check session-based active login state
function checkAuth() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const loginOverlay = document.getElementById("login-overlay");
  if (isLoggedIn) {
    if (loginOverlay) {
      loginOverlay.classList.add("opacity-0", "pointer-events-none", "hidden");
    }
  } else {
    if (loginOverlay) {
      loginOverlay.classList.remove("opacity-0", "pointer-events-none", "hidden");
    }
  }
}

// Process login form validation
function handleLogin(event) {
  event.preventDefault();
  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-password");
  const errorAlert = document.getElementById("login-error");
  const loginCard = document.getElementById("login-card");

  const email = emailInput ? emailInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value : "";

  if (email.toLowerCase() === AUTH_CONFIG.email.toLowerCase() && password === AUTH_CONFIG.password) {
    // Store successful authentication in session storage
    sessionStorage.setItem("isLoggedIn", "true");
    if (errorAlert) errorAlert.classList.add("hidden");
    
    // Smooth transition fade-out overlay
    const loginOverlay = document.getElementById("login-overlay");
    if (loginOverlay) {
      loginOverlay.classList.add("opacity-0", "pointer-events-none");
      // Add hidden display style after CSS transition completes
      setTimeout(() => {
        loginOverlay.classList.add("hidden");
      }, 500);
    }
  } else {
    // Display error message
    if (errorAlert) errorAlert.classList.remove("hidden");
    
    // Trigger invalid shake animation feedback
    if (loginCard) {
      loginCard.classList.remove("shake");
      void loginCard.offsetWidth; // Force reflow
      loginCard.classList.add("shake");
    }
    
    // Clear password input and set focus back
    if (passwordInput) {
      passwordInput.value = "";
      passwordInput.focus();
    }
  }
}

// Bind login handler to global window scope
window.handleLogin = handleLogin;

// State Management for the Invoice App
let invoiceState = {
  docType: "invoice",
  supplier: {
    gstin: "23BZPPR0632A1ZP",
    name: "OVERALL Medical",
    subName: "Equipment's solution",
    address: "Near Om Neelam Hotel, PTS Road, Rewa Mp.",
    pinCode: "486001",
    email: "omsindia@gmail.com",
    phone: "9630059578",
    bankName: "Indian Bank",
    accountNo: "8125428573",
    branchIfsc: "Amarpatan & IDIB000A592"
  },
  buyer: {
    name: "Saudamini Multispeciality Hospital, Rewa",
    address: "Madhyapradesh - 486001",
    gstin: "23ABPCS9276F1ZT"
  },
  meta: {
    billNumber: "0032",
    dateOfIssue: "2026-03-29",
    quotationNo: ""
  },
  items: [
    {
      id: 1,
      desc: "Ventilator maquet Servo i\n(Universal & Back support system)",
      hsn: "",
      qty: 2,
      rate: 750000,
      per: "Nos"
    },
    {
      id: 2,
      desc: "Laparoscopy camera system\n(Telescope with instruments, Light source, insufflator )",
      hsn: "",
      qty: 1,
      rate: 1650000,
      per: "Set"
    },
    {
      id: 3,
      desc: "ECG BPL 9108D 12 channel machine",
      hsn: "",
      qty: 1,
      rate: 95000,
      per: "Nos"
    },
    {
      id: 4,
      desc: "Cautery machine for critical surgery\nMultiple modes with screen",
      hsn: "",
      qty: 1,
      rate: 775000,
      per: "Nos"
    },
    {
      id: 5,
      desc: "CTG machine BPL inbuilt printer and screen",
      hsn: "",
      qty: 1,
      rate: 245000,
      per: "Nos"
    },
    {
      id: 6,
      desc: "Neonatal Nasal bubble C pap",
      hsn: "",
      qty: 2,
      rate: 350000,
      per: "Nos"
    }
  ],
  taxRate: 2.5 // CGST and SGST are both 2.5% (total 5%)
};

// Formats number to Indian Currency String (e.g. 49,65,000.00)
function formatIndianCurrency(num) {
  if (isNaN(num)) return "0.00";
  const numStr = parseFloat(num).toFixed(2);
  const parts = numStr.split('.');
  let lastThree = parts[0].substring(parts[0].length - 3);
  const otherParts = parts[0].substring(0, parts[0].length - 3);
  if (otherParts !== '') {
    lastThree = ',' + lastThree;
  }
  const formattedInt = otherParts.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  return formattedInt + '.' + parts[1];
}

// Convert Number to Words (Indian Numbering System)
function numberToWords(num) {
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function numToWordsHelper(n) {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + numToWordsHelper(n % 100) : "");
    if (n < 100000) return numToWordsHelper(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + numToWordsHelper(n % 1000) : "");
    if (n < 10000000) return numToWordsHelper(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + numToWordsHelper(n % 100000) : "");
    return numToWordsHelper(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 ? " " + numToWordsHelper(n % 10000000) : "");
  }

  const intPart = Math.floor(num);
  const decPart = Math.round((num - intPart) * 100);
  
  let result = "";
  if (intPart === 0) {
    result = "Zero";
  } else {
    result = numToWordsHelper(intPart).trim();
  }
  
  result += " Rupees";
  
  if (decPart > 0) {
    result += " and " + numToWordsHelper(decPart).trim() + " Paise";
  }
  
  return result + " Only";
}

// Perform calculations based on state
function getCalculatedValues() {
  let subtotal = 0;
  const items = invoiceState.items.map(item => {
    const qty = parseFloat(item.qty) || 0;
    const rate = parseFloat(item.rate) || 0;
    const amt = qty * rate;
    subtotal += amt;
    return { ...item, amt };
  });

  const cgstRate = parseFloat(invoiceState.taxRate) || 0;
  const sgstRate = parseFloat(invoiceState.taxRate) || 0;
  
  const cgstAmount = subtotal * (cgstRate / 100);
  const sgstAmount = subtotal * (sgstRate / 100);
  const grandTotal = subtotal + cgstAmount + sgstAmount;

  return {
    items,
    subtotal,
    cgstAmount,
    sgstAmount,
    grandTotal
  };
}

// Set initial values for metadata and supplier inputs on page load
function initializeEditorValues() {
  document.getElementById('input-billNumber').value = invoiceState.meta.billNumber;
  document.getElementById('input-dateOfIssue').value = invoiceState.meta.dateOfIssue;
  document.getElementById('input-quotationNo').value = invoiceState.meta.quotationNo;
  document.getElementById('input-buyerName').value = invoiceState.buyer.name;
  document.getElementById('input-buyerAddress').value = invoiceState.buyer.address;
  document.getElementById('input-buyerGstin').value = invoiceState.buyer.gstin;
  document.getElementById('input-taxRate').value = invoiceState.taxRate;

  document.getElementById('input-supplierGstin').value = invoiceState.supplier.gstin;
  document.getElementById('input-supplierName').value = invoiceState.supplier.name;
  document.getElementById('input-supplierSubName').value = invoiceState.supplier.subName;
  document.getElementById('input-supplierAddress').value = invoiceState.supplier.address;
  document.getElementById('input-supplierPinCode').value = invoiceState.supplier.pinCode;
  document.getElementById('input-supplierEmail').value = invoiceState.supplier.email;
  document.getElementById('input-supplierPhone').value = invoiceState.supplier.phone;
  document.getElementById('input-bankName').value = invoiceState.supplier.bankName;
  document.getElementById('input-accountNo').value = invoiceState.supplier.accountNo;
  document.getElementById('input-branchIfsc').value = invoiceState.supplier.branchIfsc;
}

// Update the layout of the editor (classes and visibility) only when the document type switches
function updateDocTypeLayout() {
  // Update Segmented Control Button Classes
  const invoiceBtn = document.getElementById('btn-docType-invoice');
  const quotationBtn = document.getElementById('btn-docType-quotation');
  if (invoiceState.docType === 'invoice') {
    if (invoiceBtn) invoiceBtn.className = "flex-1 py-2 px-3 text-center rounded-xl text-xs sm:text-sm font-bold transition duration-200 bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-500/15";
    if (quotationBtn) quotationBtn.className = "flex-1 py-2 px-3 text-center rounded-xl text-xs sm:text-sm font-semibold transition duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40";
  } else {
    if (quotationBtn) quotationBtn.className = "flex-1 py-2 px-3 text-center rounded-xl text-xs sm:text-sm font-bold transition duration-200 bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-500/15";
    if (invoiceBtn) invoiceBtn.className = "flex-1 py-2 px-3 text-center rounded-xl text-xs sm:text-sm font-semibold transition duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40";
  }

  // Update metadata form layout based on docType
  const billNumberContainer = document.getElementById('container-billNumber');
  const metadataHeaderTitle = document.getElementById('metadata-header-title');
  const labelDateOfIssue = document.getElementById('label-dateOfIssue');
  const labelQuotationNo = document.getElementById('label-quotationNo');
  const metadataGrid = document.getElementById('metadata-grid');
  
  if (invoiceState.docType === 'invoice') {
    if (billNumberContainer) billNumberContainer.style.display = 'block';
    if (metadataHeaderTitle) metadataHeaderTitle.innerText = "1. Document Identifiers";
    if (labelDateOfIssue) labelDateOfIssue.innerText = "Date of Issue";
    if (labelQuotationNo) labelQuotationNo.innerText = "Quotation Number (Optional)";
    if (metadataGrid) metadataGrid.className = "grid grid-cols-1 md:grid-cols-2 gap-4";
  } else {
    if (billNumberContainer) billNumberContainer.style.display = 'none';
    if (metadataHeaderTitle) metadataHeaderTitle.innerText = "1. Quotation Identifiers";
    if (labelDateOfIssue) labelDateOfIssue.innerText = "Quotation Date";
    if (labelQuotationNo) labelQuotationNo.innerText = "Quotation Number";
    if (metadataGrid) metadataGrid.className = "grid grid-cols-1 gap-4";
  }
}

// Render the form and the live preview (only updates right A4 preview to prevent losing active focus)
function render() {
  const calc = getCalculatedValues();

  // Note: Editor items rows are rendered separately by renderEditorItems() to prevent losing input focus.

  // 2. Render Live Preview A4 Card
  document.getElementById('preview-gstin').innerText = invoiceState.supplier.gstin;
  document.getElementById('preview-supplier-name-bold').innerText = invoiceState.supplier.name;
  document.getElementById('preview-supplier-name-sub').innerText = invoiceState.supplier.subName;
  document.getElementById('preview-buyer-name').innerText = invoiceState.buyer.name;
  document.getElementById('preview-buyer-address').innerText = invoiceState.buyer.address;
  document.getElementById('preview-buyer-gstin').innerText = invoiceState.buyer.gstin ? `(GSTIN - ${invoiceState.buyer.gstin} )` : '';

  // Toggle meta fields in preview
  const previewDocTitle = document.getElementById('preview-doc-title');
  const previewMetaBillContainer = document.getElementById('preview-meta-bill-container');
  const previewMetaDateLabel = document.getElementById('preview-meta-date-label');
  const previewMetaQuotLabel = document.getElementById('preview-meta-quot-label');

  if (invoiceState.docType === 'invoice') {
    if (previewDocTitle) previewDocTitle.innerText = "Tax invoice";
    if (previewMetaBillContainer) previewMetaBillContainer.style.display = 'flex';
    if (previewMetaDateLabel) previewMetaDateLabel.innerText = "Date of Issue :";
    if (previewMetaQuotLabel) previewMetaQuotLabel.innerText = "Quotation No :";
    document.getElementById('preview-bill-number').innerText = invoiceState.meta.billNumber;
    document.getElementById('preview-date-issue').innerText = formatDateString(invoiceState.meta.dateOfIssue);
    document.getElementById('preview-quotation-no').innerText = invoiceState.meta.quotationNo || '—';
  } else {
    if (previewDocTitle) previewDocTitle.innerText = "Quotation";
    if (previewMetaBillContainer) previewMetaBillContainer.style.display = 'none';
    if (previewMetaDateLabel) previewMetaDateLabel.innerText = "Date :";
    if (previewMetaQuotLabel) previewMetaQuotLabel.innerText = "Quotation No :";
    document.getElementById('preview-date-issue').innerText = formatDateString(invoiceState.meta.dateOfIssue);
    document.getElementById('preview-quotation-no').innerText = invoiceState.meta.quotationNo || '—';
  }

  // Render preview table header based on docType
  const tableHeaderRow = document.getElementById('preview-table-header');
  if (invoiceState.docType === 'invoice') {
    tableHeaderRow.innerHTML = `
      <th class="w-[6%]">SN</th>
      <th class="w-[50%]">Description of Goods</th>
      <th class="w-[12%]">HSN/SAC</th>
      <th class="w-[8%]">Quantity</th>
      <th class="w-[12%]">Rate</th>
      <th class="w-[7%]">Per</th>
      <th class="w-[15%] text-right">Amount</th>
    `;
  } else {
    tableHeaderRow.innerHTML = `
      <th class="w-[6%]">SN</th>
      <th class="w-[62%]">Description of Goods</th>
      <th class="w-[8%]">Quantity</th>
      <th class="w-[12%]">Rate</th>
      <th class="w-[7%]">Per</th>
      <th class="w-[15%] text-right">Amount</th>
    `;
  }

  // Render preview table body based on docType
  const previewTableBody = document.getElementById('preview-table-body');
  previewTableBody.innerHTML = '';
  
  calc.items.forEach((item, index) => {
    const tr = document.createElement('tr');
    if (invoiceState.docType === 'invoice') {
      tr.innerHTML = `
        <td class="text-center font-medium">${index + 1}.</td>
        <td class="whitespace-pre-line leading-relaxed font-semibold">${item.desc}</td>
        <td class="text-center">${item.hsn || '—'}</td>
        <td class="text-center">${parseFloat(item.qty).toString().padStart(2, '0')}</td>
        <td class="text-right">${formatIndianCurrency(item.rate)}</td>
        <td class="text-center">${item.per}</td>
        <td class="text-right font-semibold">${formatIndianCurrency(item.amt)}</td>
      `;
    } else {
      tr.innerHTML = `
        <td class="text-center font-medium">${index + 1}.</td>
        <td class="whitespace-pre-line leading-relaxed font-semibold">${item.desc}</td>
        <td class="text-center">${parseFloat(item.qty).toString().padStart(2, '0')}</td>
        <td class="text-right">${formatIndianCurrency(item.rate)}</td>
        <td class="text-center">${item.per}</td>
        <td class="text-right font-semibold">${formatIndianCurrency(item.amt)}</td>
      `;
    }
    previewTableBody.appendChild(tr);
  });

  // Totals & Bank
  document.getElementById('preview-total-amount').innerText = formatIndianCurrency(calc.subtotal);
  document.getElementById('preview-cgst-percent').innerText = `${invoiceState.taxRate}%`;
  document.getElementById('preview-cgst-amount').innerText = formatIndianCurrency(calc.cgstAmount);
  document.getElementById('preview-sgst-percent').innerText = `${invoiceState.taxRate}%`;
  document.getElementById('preview-sgst-amount').innerText = formatIndianCurrency(calc.sgstAmount);
  document.getElementById('preview-grand-total').innerText = formatIndianCurrency(calc.grandTotal);
  
  document.getElementById('preview-bank-name').innerText = invoiceState.supplier.bankName;
  document.getElementById('preview-account-number').innerText = invoiceState.supplier.accountNo;
  document.getElementById('preview-branch-ifsc').innerText = invoiceState.supplier.branchIfsc;

  // Words and footer
  document.getElementById('preview-words').innerText = numberToWords(calc.grandTotal);
  
  const previewDeclarationText = document.getElementById('preview-declaration-text');
  if (previewDeclarationText) {
    if (invoiceState.docType === 'invoice') {
      previewDeclarationText.innerText = "We declare that this invoice shows the actual price of the goods described and that all particular's are true and correct.";
    } else {
      previewDeclarationText.innerText = "Payment 70% advance. Delivery within 7 to 10 days.";
    }
  }

  document.getElementById('preview-authorized-company').innerText = `For ${invoiceState.supplier.name} ${invoiceState.supplier.subName}`;
  document.getElementById('preview-address-footer').innerText = `Office Add. ${invoiceState.supplier.address} Pin Code - ${invoiceState.supplier.pinCode}, email: ${invoiceState.supplier.email} - ${invoiceState.supplier.phone}`;
}

// Render the editor's item inputs. This is only called when items are added, removed, or columns are switched
// to prevent rebuilding the DOM inputs on every keystroke, which causes input focus loss (and closes the mobile keyboard).
function renderEditorItems() {
  const itemsContainer = document.getElementById('editor-items-container');
  if (!itemsContainer) return;
  itemsContainer.innerHTML = '';
  
  invoiceState.items.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'grid grid-cols-12 gap-2 p-3 bg-slate-800/40 rounded-lg border border-slate-700/50 relative group fade-in';
    row.innerHTML = `
      <div class="col-span-12 ${invoiceState.docType === 'invoice' ? 'md:col-span-4' : 'md:col-span-6'}">
        <label class="block text-xs text-slate-400 font-semibold mb-1">Description</label>
        <textarea class="w-full custom-input px-3 py-1.5 text-sm rounded-md h-12 resize-none" oninput="updateItemField(${item.id}, 'desc', this.value)">${item.desc}</textarea>
      </div>
      ${invoiceState.docType === 'invoice' ? `
      <div class="col-span-4 md:col-span-2">
        <label class="block text-xs text-slate-400 font-semibold mb-1">HSN/SAC</label>
        <input type="text" class="w-full custom-input px-3 py-1.5 text-sm rounded-md" value="${item.hsn || ''}" oninput="updateItemField(${item.id}, 'hsn', this.value)">
      </div>
      ` : ''}
      <div class="col-span-4 md:col-span-2">
        <label class="block text-xs text-slate-400 font-semibold mb-1">Qty</label>
        <input type="number" step="any" class="w-full custom-input px-3 py-1.5 text-sm rounded-md" value="${item.qty}" oninput="updateItemField(${item.id}, 'qty', this.value)">
      </div>
      <div class="col-span-4 md:col-span-2">
        <label class="block text-xs text-slate-400 font-semibold mb-1">Rate</label>
        <input type="number" step="any" class="w-full custom-input px-3 py-1.5 text-sm rounded-md" value="${item.rate}" oninput="updateItemField(${item.id}, 'rate', this.value)">
      </div>
      <div class="col-span-4 md:col-span-1">
        <label class="block text-xs text-slate-400 font-semibold mb-1">Per</label>
        <input type="text" class="w-full custom-input px-3 py-1.5 text-sm rounded-md" value="${item.per}" oninput="updateItemField(${item.id}, 'per', this.value)">
      </div>
      <div class="col-span-8 md:col-span-1 flex items-end justify-end">
        <button class="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 rounded-md border border-rose-500/20 transition duration-200" onclick="removeItem(${item.id})" title="Delete Item">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    `;
    itemsContainer.appendChild(row);
  });
}

function formatDateString(dateStr) {
  if (!dateStr) return '—';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`; // DD-MM-YYYY
  }
  return dateStr;
}

// Debounce timer for grouping rapid keypresses
let renderTimeout = null;
function debouncedRender() {
  if (renderTimeout) {
    clearTimeout(renderTimeout);
  }
  renderTimeout = setTimeout(() => {
    render();
  }, 250); // 250ms delay is perfect: visually real-time, but groups rapid typing
}

// Editor Event handlers
function updateField(section, key, value) {
  invoiceState[section][key] = value;
  debouncedRender();
}

function updateMetaField(key, value) {
  invoiceState.meta[key] = value;
  debouncedRender();
}

function updateItemField(id, key, value) {
  invoiceState.items = invoiceState.items.map(item => {
    if (item.id === id) {
      let val = value;
      if (key === 'qty' || key === 'rate') {
        val = parseFloat(value) || 0;
      }
      return { ...item, [key]: val };
    }
    return item;
  });
  debouncedRender();
}

function removeItem(id) {
  if (invoiceState.items.length <= 1) {
    alert("An invoice must contain at least one item.");
    return;
  }
  invoiceState.items = invoiceState.items.filter(item => item.id !== id);
  renderEditorItems();
  render();
}

function addNewItem() {
  const newId = invoiceState.items.length > 0 ? Math.max(...invoiceState.items.map(i => i.id)) + 1 : 1;
  invoiceState.items.push({
    id: newId,
    desc: "New Product Description",
    hsn: "",
    qty: 1,
    rate: 0,
    per: "Nos"
  });
  renderEditorItems();
  render();
}

// PDF Export Functionality using jsPDF and jsPDF-AutoTable
function downloadInvoicePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true
  });

  const calc = getCalculatedValues();
  const primaryColor = [26, 37, 48]; // Sleek dark slate
  const secondaryColor = [31, 41, 55];

  // Colors & Fonts Helper
  doc.setFont("Helvetica", "normal");

  // --- HEADER SECTION ---
  doc.setFontSize(8.5);
  doc.setFont("Helvetica", "bold");
  doc.text(`GSTIN - ${invoiceState.supplier.gstin}`, 14, 15);
  
  // Right aligned company logo image using direct Base64 - enlarged for premium visual balance
  if (typeof LOGO_BASE64 !== 'undefined' && LOGO_BASE64) {
    const logoData = 'data:image/jpeg;base64,' + LOGO_BASE64;
    const width = 75; // Increased from 60 to 75 to look bigger
    const height = (321 / 876) * width; // 321 / 876 = 0.366 (height ~ 27.5mm)
    const logoX = 196 - width;
    const logoY = 39 - height; // Align bottom of logo to y = 39
    doc.addImage(logoData, 'JPEG', logoX, logoY, width, height);
  } else {
    // Fallback company text logo if image fails to load (shifted down 11mm)
    doc.setFontSize(14);
    doc.setTextColor(41, 128, 185); // Blue
    doc.text(invoiceState.supplier.name.toUpperCase(), 196, 24, { align: "right" });
    doc.setFontSize(9);
    doc.setTextColor(231, 76, 60); // Red/coral
    doc.setFont("Helvetica", "normal");
    doc.text(invoiceState.supplier.subName, 196, 28, { align: "right" });
  }
  
  doc.setTextColor(0, 0, 0);

  // Document Title based on docType (shifted to y = 36 to account for larger logo)
  const title = invoiceState.docType === 'invoice' ? 'Tax invoice' : 'Quotation';
  doc.setFontSize(14);
  doc.setFont("Helvetica", "bold");
  doc.text(title, 105, 36, { align: "center" });

  // Draw Header Border Blocks (shifted down 11mm to start at y = 43)
  doc.setLineWidth(0.3);
  doc.rect(14, 43, 91, 38); // Left panel (Buyer Details)
  doc.rect(105, 43, 91, 38); // Right panel (Invoice/Quotation Details)

  // Buyer Column Info (shifted down 11mm)
  doc.setFontSize(9.5);
  doc.setFont("Helvetica", "bold");
  doc.text("Buyer (Bill To)", 16, 48);
  doc.setFont("Helvetica", "normal");
  
  // Handle multi-line buyer name and address (shifted down 11mm)
  const buyerNameLines = doc.splitTextToSize(invoiceState.buyer.name, 87);
  doc.setFont("Helvetica", "bold");
  doc.text(buyerNameLines, 16, 53);
  
  doc.setFont("Helvetica", "normal");
  const buyerAddressLines = doc.splitTextToSize(invoiceState.buyer.address, 87);
  doc.text(buyerAddressLines, 16, 58 + (buyerNameLines.length - 1) * 4);

  const finalBuyerTextY = 58 + (buyerNameLines.length - 1) * 4 + buyerAddressLines.length * 4;
  doc.setFont("Helvetica", "bold");
  doc.text(`(GSTIN - ${invoiceState.buyer.gstin} )`, 16, finalBuyerTextY + 1);

  // Invoice/Quotation Meta Details based on docType (shifted down 11mm)
  doc.setFontSize(9.5);
  doc.setFont("Helvetica", "bold");

  if (invoiceState.docType === 'invoice') {
    doc.text("Bill Number :", 107, 49);
    doc.setFont("Helvetica", "normal");
    doc.text(invoiceState.meta.billNumber, 135, 49);

    doc.setFont("Helvetica", "bold");
    doc.text("Date of Issue :", 107, 55);
    doc.setFont("Helvetica", "normal");
    doc.text(formatDateString(invoiceState.meta.dateOfIssue), 135, 55);

    doc.setFont("Helvetica", "bold");
    doc.text("Quotation No :", 107, 61);
    doc.setFont("Helvetica", "normal");
    doc.text(invoiceState.meta.quotationNo || "—", 135, 61);
  } else {
    doc.text("Date :", 107, 49);
    doc.setFont("Helvetica", "normal");
    doc.text(formatDateString(invoiceState.meta.dateOfIssue), 135, 49);

    doc.setFont("Helvetica", "bold");
    doc.text("Quotation No :", 107, 55);
    doc.setFont("Helvetica", "normal");
    doc.text(invoiceState.meta.quotationNo || "—", 135, 55);
  }

  // --- ITEMS TABLE ---
  let tableHeaders, tableData, columnStyles;
  
  if (invoiceState.docType === 'invoice') {
    tableHeaders = [['SN', 'Description of Goods', 'HSN/SAC', 'Quantity', 'Rate', 'Per', 'Amount']];
    tableData = calc.items.map((item, index) => [
      `${index + 1}.`,
      item.desc,
      item.hsn || '—',
      parseFloat(item.qty).toString().padStart(2, '0'),
      formatIndianCurrency(item.rate),
      item.per,
      formatIndianCurrency(item.amt)
    ]);
    columnStyles = {
      0: { cellWidth: 10, halign: 'center' }, // SN
      1: { cellWidth: 78, halign: 'left', fontStyle: 'bold' }, // Description
      2: { cellWidth: 18, halign: 'center' }, // HSN
      3: { cellWidth: 18, halign: 'center' }, // Qty
      4: { cellWidth: 26, halign: 'right' }, // Rate
      5: { cellWidth: 14, halign: 'center' }, // Per
      6: { cellWidth: 28, halign: 'right', fontStyle: 'bold' } // Amount
    };
  } else {
    tableHeaders = [['SN', 'Description of Goods', 'Quantity', 'Rate', 'Per', 'Amount']];
    tableData = calc.items.map((item, index) => [
      `${index + 1}.`,
      item.desc,
      parseFloat(item.qty).toString().padStart(2, '0'),
      formatIndianCurrency(item.rate),
      item.per,
      formatIndianCurrency(item.amt)
    ]);
    columnStyles = {
      0: { cellWidth: 10, halign: 'center' }, // SN
      1: { cellWidth: 96, halign: 'left', fontStyle: 'bold' }, // Description
      2: { cellWidth: 18, halign: 'center' }, // Qty
      3: { cellWidth: 26, halign: 'right' }, // Rate
      4: { cellWidth: 14, halign: 'center' }, // Per
      5: { cellWidth: 28, halign: 'right', fontStyle: 'bold' } // Amount
    };
  }

  doc.autoTable({
    startY: 85,
    head: tableHeaders,
    body: tableData,
    theme: 'grid',
    styles: {
      fontSize: 9,
      cellPadding: { top: 3.5, bottom: 3.5, left: 3, right: 3 },
      lineColor: [203, 213, 225],
      lineWidth: 0.2,
      textColor: [30, 41, 59]
    },
    headStyles: {
      fillColor: [241, 245, 249],
      textColor: [15, 23, 42],
      fontSize: 8.5,
      fontStyle: 'bold',
      halign: 'center',
      valign: 'middle',
      lineColor: [186, 200, 218],
      lineWidth: 0.3
    },
    columnStyles: columnStyles,
    didDrawCell: (data) => {}
  });

  const finalY = doc.lastAutoTable.finalY || 95;

  // --- BANK & TOTALS SECTION ---
  // Table border grid beneath the main table
  doc.setLineWidth(0.3);
  doc.rect(14, finalY, 182, 32); // Outer rect
  doc.line(100, finalY, 100, finalY + 32); // Vertical divide

  // Bank Info (Left Side)
  doc.setFontSize(8.5);
  doc.setFont("Helvetica", "bold");
  doc.text("Company's Bank Details", 16, finalY + 5);
  doc.setFont("Helvetica", "bold");
  doc.text("Bank Name :", 16, finalY + 11);
  doc.setFont("Helvetica", "normal");
  doc.text(invoiceState.supplier.bankName, 38, finalY + 11);

  doc.setFont("Helvetica", "bold");
  doc.text("A/C No. :", 16, finalY + 17);
  doc.setFont("Helvetica", "normal");
  doc.text(invoiceState.supplier.accountNo, 38, finalY + 17);

  doc.setFont("Helvetica", "bold");
  doc.text("Branch & IFSC :", 16, finalY + 23);
  doc.setFont("Helvetica", "normal");
  doc.text(invoiceState.supplier.branchIfsc, 42, finalY + 23);

  // Totals Info (Right Side)
  // Sub-lines for totals grid
  doc.line(100, finalY + 8, 196, finalY + 8);
  doc.line(100, finalY + 16, 196, finalY + 16);
  doc.line(100, finalY + 24, 196, finalY + 24);
  
  // Total label, CGST, SGST, Subtotal columns vertical lines
  doc.line(150, finalY, 150, finalY + 32);

  doc.setFontSize(9);
  doc.setFont("Helvetica", "normal");
  doc.text("Total Amount", 102, finalY + 5.5);
  doc.setFont("Helvetica", "bold");
  doc.text(formatIndianCurrency(calc.subtotal), 194, finalY + 5.5, { align: 'right' });

  doc.setFont("Helvetica", "normal");
  doc.text(`CGST ${invoiceState.taxRate}%`, 102, finalY + 13.5);
  doc.text(formatIndianCurrency(calc.cgstAmount), 194, finalY + 13.5, { align: 'right' });

  doc.setFont("Helvetica", "normal");
  doc.text(`SGST ${invoiceState.taxRate}%`, 102, finalY + 21.5);
  doc.text(formatIndianCurrency(calc.sgstAmount), 194, finalY + 21.5, { align: 'right' });

  doc.setFont("Helvetica", "bold");
  doc.text("Sub Total", 102, finalY + 29.5); // This corresponds to Grand Total in the overall layout
  doc.text(formatIndianCurrency(calc.grandTotal), 194, finalY + 29.5, { align: 'right' });

  // --- FOOTER SECTION ---
  let footerY = finalY + 37;

  // Words amount
  doc.setFontSize(8.5);
  doc.setFont("Helvetica", "bold");
  doc.text("Chargable Amount (In Words) :", 14, footerY);
  doc.setFont("Helvetica", "normal");
  const wordsLines = doc.splitTextToSize(numberToWords(calc.grandTotal), 180);
  doc.text(wordsLines, 14, footerY + 4.5);

  // Declaration (Left) and Authorized Signatory (Right)
  const signatureY = footerY + 17;
  doc.setFont("Helvetica", "bold");
  doc.text("Declaration :", 14, signatureY);
  doc.setFont("Helvetica", "normal");
  
  const declText = invoiceState.docType === 'invoice' 
    ? "We declare that this invoice shows the actual price of the goods described and that all particular's are true and correct."
    : "Payment 70% advance. Delivery within 7 to 10 days.";
  const declLines = doc.splitTextToSize(declText, 95);
  doc.text(declLines, 14, signatureY + 4.5);

  // Seal / Stamp image overlay drawn first, so text is printed on top of the white background
  if (typeof SEAL_BASE64 !== 'undefined' && SEAL_BASE64) {
    const sealData = 'data:image/jpeg;base64,' + SEAL_BASE64;
    // Stamped on bottom right overlapping signature area
    doc.addImage(sealData, 'JPEG', 158, signatureY - 6, 25, 25);
  }

  // Signature Block drawn on top of the stamp
  doc.setFont("Helvetica", "bold");
  doc.text(`For ${invoiceState.supplier.name} ${invoiceState.supplier.subName}`, 196, signatureY, { align: 'right' });
  
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Authorized Signatory", 196, signatureY + 16, { align: 'right' });

  // Bottom blue ribbon at absolute bottom of page (full-bleed edge-to-edge)
  const footerAddressLine = `Office Add. ${invoiceState.supplier.address} Pin Code - ${invoiceState.supplier.pinCode}, email: ${invoiceState.supplier.email} - ${invoiceState.supplier.phone}`;
  doc.setFillColor(41, 128, 185); // Brand Blue
  doc.rect(0, 287, 210, 10, 'F'); // Full width from x = 0 to 210, y = 287 to 297
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7.5);
  doc.setFont("Helvetica", "normal");
  doc.text(footerAddressLine, 105, 293, { align: 'center' });

  // Save the generated document
  const pdfFilename = invoiceState.docType === 'invoice' 
    ? `invoice_${invoiceState.meta.billNumber || 'draft'}.pdf` 
    : `quotation_${invoiceState.meta.quotationNo || 'draft'}.pdf`;
  doc.save(pdfFilename);
}

// Switch Document Type handler
function switchDocType(type) {
  invoiceState.docType = type;
  renderEditorItems();
  render();
}

// Global scope bindings for inline HTML interactions
window.updateField = updateField;
window.updateMetaField = updateMetaField;
window.updateItemField = updateItemField;
window.removeItem = removeItem;
window.addNewItem = addNewItem;
window.downloadInvoicePDF = downloadInvoicePDF;
window.switchDocType = switchDocType;

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  checkAuth();
  renderEditorItems();
  render();
});
