let prevScrollPosition;
let defaultPage = 1;
let defaultPageSize = 8;
let currentPage = defaultPage;
let currentPageSize = defaultPageSize;
let totalPages = 0;
const sortBy = "createDate";
const sortOrder = "desc";
let searchValue = "";
let searchParameter = "";

const debounce = (func, delay) => {
    let debounceTimer
    return function () {
        const context = this
        const args = arguments
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => func.apply(context, args), delay)
    }
}

const fetchCertificatesApi = () => {
    return 'http://localhost:8087/giftCertificates?page=' + currentPage + '&pageSize=' + currentPageSize +
        "&sortValue=" + sortBy + "&sortType=" + sortOrder +
        "&searchParameter=" + searchParameter + "&searchValue=" + searchValue;
}

const showCertificates = (certificates) => {
    const giftsContainer = document.getElementById("gifts-container");
    var template = document.querySelector("#coupon-template");
    certificates.forEach(gift => {
        var clone = template.content.cloneNode(true);
        var name = clone.querySelector("#name");
        name.textContent = gift.name;
        var description = clone.querySelector("#description");
        description.textContent = gift.description;
        var price = clone.querySelector("#price");
        price.textContent = gift.price;
        giftsContainer.appendChild(clone);
    });
}

const clearCertificates = () => {
    var giftsContainer = document.getElementById("gifts-container");
    var giftList = giftsContainer.querySelectorAll("#coupon-cl");

    giftList.forEach(gift => {
        giftsContainer.removeChild(gift);
    });

    currentPage = defaultPage;
    currentPageSize = defaultPageSize;
}

window.onscroll = () => { scrollFunction(); }

const scrollFunction = () => {
    scrollButton = document.getElementById("scrollToTopButton");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollButton.textContent = 'arrow_upward';
        scrollButton.style.display = "block";
    } else {
        scrollButton.textContent = 'arrow_downward';
    }

}

const scrollToTopFunction = () => {
    if (document.documentElement.scrollTop !== 0) {
        prevScrollPosition = document.documentElement.scrollTop;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    } else {
        document.body.scrollTop = prevScrollPosition;
        document.documentElement.scrollTop = prevScrollPosition;
        prevScrollPosition = 0;
    }
}

const loadCoupons = () => {
    var getGiftsUrl = fetchCertificatesApi();

    fetch(getGiftsUrl, {
        method: "GET",
        mode: 'cors'
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            var giftList = data._embedded.giftCertificateRepresentationList;
            totalPages = data.page.totalPages;
            showCertificates(giftList);
        });
}

window.onscroll = () => {
    scrollFunction();
    if (window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight) {
        if (currentPage < totalPages) {
            currentPage++;
            debounce(loadCoupons(), 3000);
        }
    }
}

const search = () => {
    clearCertificates();
    currentPage = defaultPage;
    var searchInput = document.getElementById("search-input");
    var filter = searchInput.value;
    searchValue = filter;
    searchParameter = getCategory();
    loadCoupons();
}

const getCategory = () => {
    var searchButton = document.getElementById("search-button-text");
    var category = searchButton.textContent;
    console.log(category);
    if (category !== "All Categories") {
        return category.toLowerCase();
    } else {
        return "";
    }
}

const searchCategories = () => {
    var input = document.getElementById("dropdown-search-input");
    var value = input.value.toUpperCase();
    var categoriesContainer = document.getElementById("categories-container");
    var categories = categoriesContainer.querySelectorAll("a");

    categories.forEach(category => {
        var categoryName = category.textContent;
        if (categoryName.toUpperCase().indexOf(value) === -1) {
            category.style.display = "none";
        }
        else {
            category.style.display = "";
        }
    })
}

const setOnClickSearchCategory = () => {
    var categories = document.querySelectorAll("#search-category");
    console.log(categories)
    categories.forEach(category => {
        category.onclick = function () {
            var searchButton = document.getElementById("search-button-text");
            searchButton.textContent = this.textContent;
        }
    })
}

window.onload = () => {
    setOnClickSearchCategory()
    loadCoupons()
}