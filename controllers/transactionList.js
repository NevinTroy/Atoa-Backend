const handleTransactionList=(req,res,db,jwt)=>{ 
    const page=parseInt(req.query.page);
    const noOfItems=parseInt(req.query.noOfItems);
    const transactionID=parseInt(req.query.transactionID);

    if(!transactionID){
        const startIndex=(page-1)*noOfItems;
        const endIndex=page*noOfItems;
        
        db
        .select('name','image_url','amount','type','currency')
        .from('TRANSACTIONS')
        .whereBetween('id',[startIndex,endIndex])
        .then(data=>{
            res.json({
                pageNumber: page,
                data: data
            });
        })
        .catch(err=>{
            res.send(err);
        })
    }
    else{
        db
        .select('name','image_url','amount','type','currency')
        .from('transactions')
        .where('id','=',transactionID)
        .then(data=>{
            res.json(data[0]);
        })
        .catch(err=>{
            res.send(err);
        })   
    }
}   

module.exports={
    handleTransactionList
}