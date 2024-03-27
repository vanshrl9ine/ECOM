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
        console.log(keyword);
        this.query.find({...keyword});
        return this;
        
    }
}
export default ApiFeatures;