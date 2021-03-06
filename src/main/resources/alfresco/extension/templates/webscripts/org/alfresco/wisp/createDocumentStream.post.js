var documentType= args.documentType;
var documentName= args.documentName;
var documentContent=args.documentContent;

var errorMessage="";
var testingFolder=null;
var newDocument=null;

try {

	if((documentType.replace(/^\s+|\s+$/g,'')!='' && documentName.replace(/^\s+|\s+$/g,'')!='') ){

		var xFolder =companyhome.childByNamePath("WISP/WISP_"+documentType);
		var file=companyhome.childByNamePath("WISP/WISP_"+documentType+"/"+documentName);
		if(file==null){
			 if(xFolder!=null){
				 testingFolder=xFolder;
				 newDocument= testingFolder.createFile(documentName) ;
				 newDocument.content=documentContent;
				 newDocument.properties.content.setEncoding("UTF-8");
				 newDocument.properties.content.guessMimetype(documentName);
				 newDocument.ensureVersioningEnabled(true, true);
			}
			else{
				errorMessage="document type not matching";
			}
		}
		else{
			errorMessage="file name already exists";
		}
	}
	else{
	   errorMessage="document type or document name is blank";
	}
}

catch(err)
{
	errorMessage=err.message;
	//newDocument= "";
}
finally{
	model.errorMessage=errorMessage;
	model.node=newDocument;
 }

