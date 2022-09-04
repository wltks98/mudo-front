<template>
  <v-app id="app">
    <v-navigation-drawer app>
      
    </v-navigation-drawer>

    <v-app-bar app>
      <v-toolbar-title></v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-row>
        <v-col>
      <v-form ref="form">
          <v-text-field
            v-model="keyword"
            type="text"
          ></v-text-field>
      </v-form>
      </v-col>
      <v-col>
      <v-btn @click="search">검색</v-btn>
      <v-btn @click="uploadClick">업로드</v-btn>
      <v-btn v-if="imgUrl!=''" @click="download">다운로드</v-btn>
      <a id="create-kakaotalk-sharing-btn" href="javascript:;">
      <img
        src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
        alt="카카오톡 공유 보내기 버튼"
      />
    </a>
      </v-col>
      </v-row>
      <input
            accept-charset="UTF-8"
            enctype = "multipart/form-data"
            ref="uploader"
            class="d-none"
            type="file"
            @change="imgUpload"
            multiple
            style="display:none;"
            >
      
      <v-card class="mx-auto" max-width="600">
         <v-img
        :src="imgUrl"
        /> 

        <!-- <v-card-text>
          <div>오늘의 단어</div>
          <p class="display-1 text--primary">responsive web design</p>
          <div class="text--primary">
            화면의 크기가 자동으로 변하도록 만든 웹페이지 접근 기법을 말한다.
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="deep-purple accent-4"> Learn More </v-btn>
        </v-card-actions> -->
      </v-card>

      <template>
        <v-dialog v-model="dialog.loading" persistent max-width="500px">
            <v-progress-linear
            color="#1CFFA0"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-dialog>
    </template>
    </v-main>
  </v-app>
  
</template>


<script>

export default {
  name: 'HelloWorld',

  data () {
    return {
      keyword:'',
      imgUrl:'',
      key:'',
      dialog:{
        loading:false
      }
    }
  },
  mounted(){

    if (!this.$kakao.isInitialized()) {
      this.$kakao.init(process.env.VUE_APP_SDK);
    }

    

  },
  methods:{
    async search(){
      await this.$axios.get(`/img?keyword=${this.keyword}`)
        .then(result=>{
            const {data}=result

            if (data.success){
                this.imgUrl=data.url
                this.key=data.key
                console.log(data)
                this.makeButton()
            }
            else{
                alert('검색 결과 없음')
            }})
        .catch(err=>{console.log(err)})
    },
    uploadClick(){
      this.$refs.uploader.click()
    },
    async imgUpload(e){

            this.dialog.loading=true
            
            const formData = new FormData()
            for (let img of e.target.files) {
              formData.append('images', img);
            }
            formData.append('path',this.$route.params.path)

            await this.$axios.post(`/img`,formData)
            .then(result=>{
                const {data}=result

                if (data.success){
                    location.reload()
                }
                else{
                    alert('실패')
                }})
            .catch(err=>{console.log(err)})
    },
    makeButton(){
          this.$kakao.Share.createDefaultButton({
        container: '#create-kakaotalk-sharing-btn',
        objectType: 'feed',
        content: {
          title: '',
          description: '',
          imageUrl:
            this.imgUrl,
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com',
          },
        },
        social: {
          likeCount: 286,
          commentCount: 45,
          sharedCount: 845,
        },
        buttons: [
          
        ],
      })
    },
    
    async download(){

      const arr=this.imgUrl.split('amazonaws.com')
      console.log(arr)
      await this.$axios({
				url: '/img/download',
				method: 'POST',
				responseType: 'blob',
        data:{key:this.key}
			})
        .then(response=>{
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
				const fileLink = document.createElement('a');

				fileLink.href = fileURL;
				fileLink.setAttribute('download', '다운로드.jpg');
				document.body.appendChild(fileLink);

				fileLink.click();
            })
        .catch(err=>{console.log(err)})
    }


    

    
  }
}
</script>





