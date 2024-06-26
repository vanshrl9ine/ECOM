class ApiFeatures{
    constructor(query,querystring){
        this.query=query;
        this.querystring=querystring;
    }
    search(){
        const keyword=this.querystring.keyword?{ 
            name:{
                $regex:this.querystring.keyword,
                $options:"i"//case insensitive
            },
        }:{};
        // console.log(keyword);
        this.query.find({...keyword});
        return this;
        
    }
    filter(){
        const querystringcopy={...this.querystring};//external copy created if spread not used then pass by ref will happen
        // console.log(querystringcopy);
        const removeFields=["keyword","page","limit"];
        removeFields.forEach(key=>delete querystringcopy[key]);

        //filter of price and rating
        
        let queryStr=JSON.stringify(querystringcopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);

        
        this.query=this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(resultPerPage){
        const currentPage=Number(this.querystring.page) || 1;
        const skip=resultPerPage*(currentPage-1);
        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}
export default ApiFeatures;