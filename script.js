// Sample Mock Document Data for Education Library
const initialDocuments = [
    {
        id: 1,
        title: "Chuyên đề giảng dạy: Hồ Chí Minh và con đường giải phóng dân tộc",
        category: "hcm",
        format: "pdf",
     downloadUrl: "https://drive.google.com/file/d/1JZzMhMfOwgDhp2L8h_UdD9OGMSelwl-3/preview"
    },
    {
        id: 2,
        title: "Giáo án Lịch sử lớp 8: Khái quát Lịch sử thế giới cận đại (Chân trời sáng tạo)",
        category: "history",
        format: "dieu-hanh",
        downloadUrl: "https://drive.google.com/drive/folders/1e38xV1AjKPVUqWbOjzu6yICMS1Pc6do2?usp=drive_link"
    },
    {
        id: 3,
        title: "Bài giảng PowerPoint Địa lý 7: Bài 14 - Vị trí địa lý và đặc điểm tự nhiên Biển Đông",
        category: "geography",
        format: "powerpoint",
        downloadUrl: "#"
    },
    {
        id: 4,
        title: "Tài liệu học tập: Tư tưởng Hồ Chí Minh về đại đoàn kết toàn dân tộc",
        category: "hcm",
        format: "pdf",
        downloadUrl: "#"
    },
    {
        id: 5,
        title: "Giáo án Địa lý lớp 6: Bản đồ và cách sử dụng bản đồ trong đời sống",
        category: "geography",
        format: "dieu-hanh",
        downloadUrl: "#"
    },
    {
        id: 6,
        title: "Bài giảng PowerPoint Lịch sử 7: Cuộc kháng chiến chống quân xâm lược Mông - Nguyên",
        category: "history",
        format: "powerpoint",
        downloadUrl: "#"
    }
];

let currentCategory = "all";
let currentFormat = "all-formats";
let searchKeyword = "";

// Element Selectors
const documentsGrid = document.getElementById("documentsGrid");
const searchInput = document.getElementById("searchInput");
const currentCategoryTitle = document.getElementById("currentCategoryTitle");
const matchCount = document.getElementById("matchCount");
const noResults = document.getElementById("noResults");
const themeToggle = document.getElementById("themeToggle");

// Modal Selectors
const previewModal = document.getElementById("previewModal");
const closeModal = document.getElementById("closeModal");
const btnCancel = document.getElementById("btnCancel");
const modalTitle = document.getElementById("modalTitle");
const modalMetaCategory = document.getElementById("modalMetaCategory");
const modalMetaFormat = document.getElementById("modalMetaFormat");
const modalDownloadBtn = document.getElementById("modalDownloadBtn");

// Category Translations mapping
const categoryLabels = {
    all: "Tất cả tài liệu số",
    hcm: "Hồ Chí Minh với Cách mạng Việt Nam",
    history: "Tài liệu Lịch sử số",
    geography: "Tài liệu Địa lý số"
};

const formatLabels = {
    "pdf": "Định dạng PDF",
    "dieu-hanh": "Giáo án Word (.doc)",
    "powerpoint": "Bài giảng PowerPoint (.ppt)"
};

// Render documents based on filters
function renderDocuments() {
    documentsGrid.innerHTML = "";
    
    const filtered = initialDocuments.filter(doc => {
        const matchesCategory = currentCategory === "all" || doc.category === currentCategory;
        const matchesFormat = currentFormat === "all-formats" || doc.format === currentFormat;
        const matchesSearch = doc.title.toLowerCase().includes(searchKeyword.toLowerCase());
        return matchesCategory && matchesFormat && matchesSearch;
    });

    matchCount.textContent = filtered.length;
    
    if (filtered.length === 0) {
        noResults.classList.remove("hidden");
    } else {
        noResults.classList.add("hidden");
        
        filtered.forEach(doc => {
            const card = document.createElement("div");
            card.className = "doc-card";
            
            let formatClass = "format-pdf";
            let formatName = "PDF";
            if (doc.format === "dieu-hanh") { formatClass = "format-word"; formatName = "Word"; }
            if (doc.format === "powerpoint") { formatClass = "format-ppt"; formatName = "PPT"; }
            
            let catName = doc.category === "hcm" ? "Chuyên đề HCM" : (doc.category === "history" ? "Lịch sử" : "Địa lý");

            card.innerHTML = `
                <div class="doc-header">
                    <span class="format-badge ${formatClass}">${formatName}</span>
                    <span class="category-tag">${catName}</span>
                </div>
                <h4>${doc.title}</h4>
                <div class="doc-actions">
                    <button class="btn btn-secondary" onclick="openPreview(${doc.id})"><i class="fa-solid fa-eye"></i> Xem</button>
                    <button class="btn btn-primary" onclick="triggerDownload('${doc.title}')"><i class="fa-solid fa-download"></i> Tải về</button>
                </div>
            `;
            documentsGrid.appendChild(card);
        });
    }
}

// Modal Interactivity
window.openPreview = function(id) {
    const doc = initialDocuments.find(d => d.id === id);
    if (!doc) return;
    
    modalTitle.textContent = doc.title;
    modalMetaCategory.innerHTML = `<i class="fa-solid fa-folder"></i> ${categoryLabels[doc.category]}`;
    modalMetaFormat.innerHTML = `<i class="fa-solid fa-file"></i> ${formatLabels[doc.format]}`;
    modalDownloadBtn.setAttribute("href", doc.downloadUrl);
    
    previewModal.classList.add("active");
};

function closeModalWindow() {
    previewModal.classList.remove("active");
}

closeModal.addEventListener("click", closeModalWindow);
btnCancel.addEventListener("click", closeModalWindow);
window.addEventListener("click", (e) => {
    if (e.target === previewModal) closeModalWindow();
});

window.triggerDownload = function(title) {
    alert(`Đang khởi tạo tải xuống an toàn cho tài liệu:\n"${title}"`);
};

// Search trigger
searchInput.addEventListener("input", (e) => {
    searchKeyword = e.target.value;
    renderDocuments();
});

// Category and format filter listeners
document.querySelectorAll(".sidebar [data-category]").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".sidebar [data-category]").forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        currentCategory = item.getAttribute("data-category");
        currentCategoryTitle.textContent = categoryLabels[currentCategory];
        renderDocuments();
    });
});

document.querySelectorAll(".sidebar [data-format]").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".sidebar [data-format]").forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        currentFormat = item.getAttribute("data-format");
        renderDocuments();
    });
});

// Theme Toggle Engine
themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const targetTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", targetTheme);
    
    const icon = themeToggle.querySelector("i");
    if (targetTheme === "dark") {
        icon.className = "fa-solid fa-sun";
    } else {
        icon.className = "fa-solid fa-moon";
    }
});

// Initialize Setup
renderDocuments();
