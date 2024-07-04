<template>
    <div dir="rtl">
        <div dir="rtl" :class="['sidebar']">
            <!-- <a href="javascript:void(0)" class="closebtn">×</a> -->
            <a href="#"><i class="fas fa-home"></i> Dashboard</a>
            <a href="#"><i class="fas fa-wallet"></i> Wallet</a>
            <a href="#"><i class="fas fa-shopping-cart"></i> Buy Subscription</a>
            <a href="#"><i class="fas fa-shopping-bag"></i> My Purchases</a>
            <a href="#"><i class="fas fa-box-open"></i> My Orders</a>
            <a href="#"><i class="fas fa-clipboard-list"></i> My Subscriptions</a>
            <a href="https://homeenger.com/mag/privacypolicy/" target="_blank"><i class="fas fa-info-circle"></i>
                Privacy Policy</a>
            <a href="https://homeenger.com/mag/contact-us/" target="_blank"><i class="fas fa-address-book"></i>
                Contact Us</a>
        </div>
        <button class="openbtn">☰ Open Sidebar</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isOpen: false
        }
    },
    methods: {
        openNav() {
            this.isOpen = true;
        },
        closeNav() {
            this.isOpen = false;
        }
    }
}
</script>

<style scoped>
/* Custom CSS for Sidebar */
.sidebar {
    height: 100%;
    width: 250px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #343a40;
    padding-top: 20px;
    transition: 0.3s;
    overflow: hidden;
}

.sidebar a {
    padding: 15px 20px;
    text-decoration: none;
    font-size: 18px;
    color: #fff;
    display: block;
    transition: 0.3s;
}

.sidebar a:hover {
    background-color: #575757;
}

.sidebar .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
}

.openbtn {
    font-size: 20px;
    cursor: pointer;
    background-color: #343a40;
    color: white;
    padding: 10px 15px;
    border: none;
}

@media screen and (max-height: 450px) {
    .sidebar {
        padding-top: 15px;
    }

    .sidebar a {
        font-size: 18px;
    }
}

@media screen and (max-width: 768px) {
    .sidebar {
        width: 0;
        height: 100%;
        z-index: 1;
        left: -250px;
    }

    .sidebar.open {
        width: 250px;
        left: 0;
    }
}
</style>
