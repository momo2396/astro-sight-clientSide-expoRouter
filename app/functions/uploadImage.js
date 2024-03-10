export const uploadImage = async (uri, exp = 0) => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri,
        type: "image/jpeg",
        name: "upload.jpg",
      });
      let imgBBURI = "https://api.imgbb.com/1/upload?key=53de47ad43cb260869219680a0904af3";
      if (exp) imgBBURI += `&expiration=${exp}`;
      const response = await fetch(imgBBURI, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data?.data?.url;
    } catch (error) {
      console.log(error);
    }
  };


