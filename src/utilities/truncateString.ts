const truncateString=(title:string)=>{
   
      const length = 200;
      if (title.length > length) {
        title = title.substring(0, length) + "......";
      }
      return title;
    
}

export default truncateString