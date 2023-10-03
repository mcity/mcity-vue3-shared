<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <div>
    <v-toolbar app dark color="primary" :clipped-left="true" height="45px">
      <router-link to="/" class="hidden-sm-and-down">
        <mcity-logo class="mcity-logo-padding-top" />
      </router-link>
      <v-spacer />
      <v-toolbar-title class="mcity-subtitle" style="font-size: 20px;">
        {{ title }}
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <slot name="buttons" />
        <v-menu content-class="elevation-1" left v-if="showApplicationMenu" v-model="appMenu" offset-y allow-overflow
          nudge-right="77px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark v-bind="props" style="box-shadow: none;">
              <div style="color:white; font-size: 24px;">
                MENU
                <i class="fa fa-bars"></i>
              </div>
            </v-btn>
          </template>
          <v-list compact style="min-width: 1000px; max-width: 400px; max-height: 100vh;" class="overflow-y-auto">
            <v-container fluidgrid-list-sm>
              <v-layout v-for="(itemCategory, categoryIndex) in applicationCategories" :key="categoryIndex" xs4 column
                wrap style="border: 1px solid green; display:flex; flex-direction: column;">

                <v-flex xs3 class="Suneeth" >
                  <v-hover>
                    <v-list-item slot-scope="{ hover }" :href="itemCategory.link"
                      :class="getCssClassForCategory(itemCategory.text, hover)">
                      <svg-icon :url="itemCategory.svg" :style="getFontColorForMembersCategory(itemCategory.text)" />
                      <v-list-item-content class="mcity-menu-category-member"
                        :style="getFontColorForMembersCategory(itemCategory.text)"
                        style="overflow:visible; font-size: 20px; font-weight: 500; white-space: nowrap;">
                        {{ itemCategory.text.toUpperCase() }}
                      </v-list-item-content>
                    </v-list-item>
                  </v-hover>
                </v-flex>
                <v-layout column wrap style="display: flex; flex-direction: column;">
                  <v-flex class="Suneeth" style="border: 1px solid blue;" v-for="(item, index) in getCategoryMembers(itemCategory.text)" :key="index" xs3>
                    <v-list-item :href="item.link" rel="noopener">
                      <div class="d-flex" style="padding-left:66px;">
                        <svg-icon :url="item.svg" />
                        <v-list-item-content class="mcity-menu-category-member" color="primary--text"
                          style="overflow:visible; font-size: 18px; font-weight: 400; white-space: nowrap;">
                          {{ item.text }}
                        </v-list-item-content>
                      </div>

                    </v-list-item>
                  </v-flex>
                </v-layout>


              </v-layout>
              
            </v-container>
          </v-list>
        </v-menu>
        <v-menu content-class="elevation-1" left v-if="showUserMenu" v-model="avatarMenu" offset-y>
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark v-bind="props" style="box-shadow: none;">
              <svg-icon color="white" size="sm" class="mcity-user-icon mt-1"
                url="https://static.um.city/icons/user-circle-solid.svg" />
            </v-btn>
          </template>
          <v-list compact style="min-width: 400px; max-width: 400px; max-height: 90vh;" class="overflow-y-auto">
            <v-list-tile>
              <v-list-tile-content class="mcity-no-padding">
                <v-list-tile-title>
                  <a href="https://keys.um.city" rel="noopener" style="font-size: 20px;">
                    {{ fullname }}
                  </a>
                </v-list-tile-title>
                <v-list-tile-sub-title style="font-size: 18px;">
                  {{ username }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-divider style="margin:0px;" />
          <v-list>
            <v-list-tile>
              <v-btn flat class="mcity-no-padding" href="https://keys.um.city/password" v-bind="on" style="font-size:20px">
                Change Password
                <svg-icon :color="gray" class="ml-2" size="sm" url="https://static.um.city/icons/fingerprint-solid.svg" />
              </v-btn>
            </v-list-tile>
            <v-list-tile>
              <v-btn flat class="mcity-no-padding" :href="logoutUrl" v-bind="on" style="font-size: 20px;">
                Logout
                <svg-icon :color="gray" class="ml-2" size="sm"
                  url="https://static.um.city/icons/sign-out-alt-solid.svg" />
              </v-btn>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import McityLogo from "./McityLogo.vue";
import SvgIcon from "./SvgIcon";
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

<style>
a.v-list-item:hover {
  text-decoration: none;
}

.bg-members {
  background-color: #C55311;
}

.bg-members-hover {
  background-color: #9F3F07;
}

.mcity-subtitle {
  font-weight: 500;
  padding-left: 0px;
}

.mcity-menu-category-member {
  margin-left: 10px;
  overflow: visible;
}

.mcity-no-padding {
  padding: 0 0 0 0;
  letter-spacing: inherit;
}

.mcity-min-content {
  min-width: 204px;
  width: min-content;
}

.mcity-logo-padding-top {
  padding-top: 4px;
}

.mcity-user-icon {
  font-size: 16px;
}

svg-icon {
  height: 22px;
}
</style>
