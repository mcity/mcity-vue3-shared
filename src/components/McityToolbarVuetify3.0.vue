<template>
  <div>
    <v-toolbar app dark color="primary" :clipped-left="true" height="45px" class="mcity-toolbar">
      <router-link to="/" class="hidden-sm-and-down" style="width:30%">
        <mcity-logo class="mcity-logo-padding-top" />
      </router-link>
      <v-toolbar-title class="mcity-text-standard unselectable" style="text-align: center; font-weight: 500; width:30%">
        {{ title }}
      </v-toolbar-title>
      <v-toolbar-items style="width:30%; justify-content: end;">
        <slot name="buttons" />
        <v-menu content-class="elevation-1" left v-if="showApplicationMenu" v-model="appMenu" offset-y allow-overflow
          nudge-right="77px">
          <template v-slot:activator="{ props }">
            <v-btn class="mcity-strip-shadow" color="primary" light v-bind="props">
              <div class="mcity-menu-text">
                MENU
                <link rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <i class="fa fa-bars"></i>
              </div>
            </v-btn>
          </template>
          <v-list compact class="mcity-menu-body overflow-y-auto">
            <v-container fluidgrid-list-sm>
              <v-layout class="mcity-menu-order" v-for="(itemCategory, categoryIndex) in applicationCategories"
                :key="categoryIndex" xs4 column wrap style="">
                <v-hover>
                  <v-list-item :href="itemCategory.link" :class="getCssClassForCategory(itemCategory.text, hover)">
                    <div class="mcity-menu-category" style="padding-left: 0rem">
                      <svg-icon :url="itemCategory.svg" :style="getFontColorForMembersCategory(itemCategory.text)" />
                      <div class="mcity-menu-category-member mcity-text-standard"
                        :style="getFontColorForMembersCategory(itemCategory.text)">
                        {{ itemCategory.text.toUpperCase() }}
                      </div>
                    </div>
                  </v-list-item>
                </v-hover>
                <v-layout class="mcity-menu-order" column wrap>
                  <div v-for="(item, index) in getCategoryMembers(itemCategory.text)" :key="index">
                    <v-list-item :href="item.link" rel="noopener">
                      <div class="mcity-menu-category" style="padding-left: 4rem">
                        <svg-icon :url="item.svg" />
                        <div class="mcity-menu-category-member mcity-text-reduced" color="primary--text">
                          {{ item.text }}
                        </div>
                      </div>
                    </v-list-item>
                  </div>
                </v-layout>
              </v-layout>
            </v-container>
          </v-list>
        </v-menu>
        <v-menu content-class="elevation-1" left v-if="showUserMenu" v-model="avatarMenu" offset-y>
          <template v-slot:activator="{ props }">
            <v-btn class="mcity-remove-shadow mcity-strip-shadow" color="primary" dark v-bind="props">
              <svg-icon color="white" size="sm" class="mcity-text-small mt-1"
                url="https://static.um.city/icons/user-circle-solid.svg" />
            </v-btn>
          </template>
          <v-list compact class="mcity-menu-body overflow-y-auto">
            <v-list-item>
              <div class="mcity-no-padding">
                <v-list-item-title>
                  <a class="mcity-text-standard" href="https://keys.um.city" rel="noopener">
                    {{ fullname }}
                  </a>
                </v-list-item-title>
                <div class="mcity-text-reduced">
                  {{ username }}
                </div>
              </div>
            </v-list-item>
          </v-list>
          <v-divider style="margin:0px;" />
          <v-list>
            <v-list-item>
              <v-btn flat class="mcity-no-padding mcity-text-standard" href="https://keys.um.city/password" v-bind="on">
                Change Password
                <svg-icon :color="gray" class="ml-2" size="sm" url="https://static.um.city/icons/fingerprint-solid.svg" />
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn flat class="mcity-no-padding mcity-text-standard" :href="logoutUrl" v-bind="on">
                Logout
                <svg-icon :color="gray" class="ml-2" size="sm"
                  url="https://static.um.city/icons/sign-out-alt-solid.svg" />
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import McityLogo from "./McityLogo.vue";
import SvgIcon from "../components/SvgIcon.vue";
export default {
  name: 'McityToolbar',
  components: {
    'mcity-logo': McityLogo,
    'svg-icon': SvgIcon
  },
  props: {
    fullname: {
      required: false,
      type: String,
      default: ''
    },
    username: {
      required: false,
      type: String,
      default: ''
    },
    presentationText: {
      required: false,
      type: String,
      default: ''
    },
    isUserAdmin: {
      required: false,
      type: Boolean,
      default: false
    },
    title: {
      required: false,
      type: String,
      default: ''
    },
    showUserMenu: {
      type: Boolean,
      default: true
    },
    showPresentationButton: {
      type: Boolean,
      default: true
    },
    showApplicationMenu: {
      type: Boolean,
      default: true
    },
    logoutUrl: {
      required: false,
      type: String,
      default: "https://keys.um.city/logout"
    }
  },
  data() {
    return {
      drawer: false,
      appMenu: false,
      clipped: false,
      avatarMenu: false,
      hover: true,
      applicationLinks: [],
      applicationCategories: [],
      gray: '#606060',
      on: {}
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
    this.setapplicationLinks()
  },
  methods: {
    getCategoryMembers(category) {
      return this.applicationLinks.filter(function (e) {
        return e.category === category
      })
    },
    getFontColorForMembersCategory(tileText) {
      return tileText === "FOR MEMBERS" ? "color:white" : "";
    },
    getCssClassForCategory(tileText, hover) {
      console.log(tileText, hover)
      return tileText === "FOR MEMBERS" ? (hover ? "bg-members-hover" : "bg-members") : "";
    },
    getHelp() {
      window.location.href = 'mailto:mcity-engineering@umich.edu'
    },
    setapplicationLinks() {
      const req = new XMLHttpRequest()
      req.onreadystatechange = function (vue) {
        if (this.readyState === XMLHttpRequest.DONE) {
          vue.applicationLinks = JSON.parse(req.responseText)
        }
        //Set Category list
        vue.applicationCategories =
          vue.applicationLinks.filter(function (e) {
            return !e.category || e.category === "";
          })
          ;
      }.bind(req, this)
      req.open("GET", "https://static.um.city/menu_v2.json");
      req.send()
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.appMenu = false;
        this.avatarMenu = false;
      }
    },
  }
}
</script>

<style scoped>
/* Typography */
.mcity-text-standard {
  font-size: 1.25rem;
  /* 20px */
  font-weight: 500;
}

.mcity-text-reduced {
  font-size: 1.125rem;
  /* 18px */
  font-weight: 400;
}

.mcity-text-small {
  font-size: 1rem;
  /* 16 px */
}

/* Menu */
.mcity-menu-order {
  display: flex;
  flex-direction: column;
}

.mcity-menu-category {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.mcity-menu-category-member {
  margin-left: 0.625rem;
  /* 10px */
  overflow: visible;
  white-space: nowrap;
}

.mcity-menu-text {
  color: white;
  font-size: 1.5rem;
}

a.v-list-item:hover {
  text-decoration: none;
}

.bg-members {
  margin-top: 0.75rem;
  /* 12px */
  background-color: #C55311;
}

.bg-members-hover {
  margin-top: 0.75rem;
  /* 12px */
  background-color: #9F3F07;
}

.mcity-menu-body {
  min-width: 25rem;
  /* 400px */
  max-width: 25rem;
  /* 400px */
  max-height: 85vh;
  margin-top: 0.25rem;
  /* 4px */
}

/* Padding */
.mcity-no-padding {
  padding: 0 0 0 0;
  letter-spacing: inherit;
}

.mcity-min-content {
  min-width: 12.75rem;
  /* 204px */
  width: min-content;
}

.mcity-logo-padding-top {
  padding-top: 0.25rem;
  /* 4px */
}

/* Modifiers */
svg-icon {
  height: 1.375rem;
  /* 22px */
}

.mcity-strip-shadow {
  box-shadow: none;
}

.mcity-subtitle {
  font-weight: 500;
  margin-left: 0rem;
  text-align: right;
}

.mcity-toolbar {
  padding: 0.2rem 1.5rem;
  /* 0.2rem 1.5rem */
  margin: auto;
  box-shadow: 0px 0.5px 0.6px hsl(0deg 0% 63%/ 0.36),
    0px 1.6px 1.8px -0.8px hsl(0deg 0% 63%/ 0.36),
    -0.1px 3.9px 4.4px -1.7px hsl(0deg 0% 63%/ 0.36),
    -0.1px 9.5px 10.7px -2.5px hsl(0deg 0% 63%/ 0.36);
}

.unselectable {
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.v-toolbar__content>.v-toolbar-title:deep() {
  margin-inline-start: 0px;
}
</style>
