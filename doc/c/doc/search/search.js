var searchResultsText=["Sorry, no documents matching your query.","Found <b>1</b> document matching your query.","Found <b>$num</b> documents matching your query."];

var serverUrl="file://C:/SL/DOC TOOLS/SLP DOCOUT/searchengine.html";
var tagMap = {
};

function SearchBox(name, resultsPath, inFrame, label)
{
  this.searchLabel = label;
  this.DOMSearchField = function()
  {  return document.getElementById("MSearchField");  }
  this.DOMSearchBox = function()
  {  return document.getElementById("MSearchBox");  }
  this.OnSearchFieldFocus = function(isActive)
  {
    if (isActive)
    {
      this.DOMSearchBox().className = 'MSearchBoxActive';
      var searchField = this.DOMSearchField();
      if (searchField.value == this.searchLabel)
      {
        searchField.value = '';
      }
    }
    else
    {
      this.DOMSearchBox().className = 'MSearchBoxInactive';
      this.DOMSearchField().value   = this.searchLabel;
    }
  }
}

function trim(s) {
  return s?s.replace(/^\s\s*/, '').replace(/\s\s*$/, ''):'';
}

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]'+name+
         '='+'([^&;]+?)(&|#|;|$)').exec(location.search)
         ||[,""])[1].replace(/\+/g, '%20'))||null;
}

var entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};

function escapeHtml(s) {
  return String(s).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
}

function searchFor(query,page,count) {
    if(trim(query).length<3)
    {
        var results = $('#searchresults');
        results.html('<p>Query too short (3 chars mininum).</p>');
        return;
    }

    var xmlData=document.getElementById('searchdata').innerHTML;
    if(xmlData.indexOf("<add>")<0)
    {
        alert("Append <script id=\"searchdata\" type=\"text/xmldata\"> to the content of search.html, then the content of searchdata.xml, and end by </script>.\n\nsearchdata.xml is generated when SEARCHENGINE, SERVER_BASED_SEARCH and EXTERNAL_SEARCH options are enabled.");
        return;
    }
    xmlData=xmlData.substring(xmlData.indexOf("<add>"),xmlData.indexOf("</add>")+6);

    var xmlParser=new DOMParser().parseFromString(xmlData,"text/xml");

    count=0;
    output='<table>';
    var doc=xmlParser.getElementsByTagName("doc");
    for (i=0;i<doc.length;i++)
    {
        
        var attributes_col = doc[i].getElementsByTagName("field");
        var type = "";
        var name = "";
        var url = "";
        var text = "";
        
        try { 
        
            for (j=0; j<attributes_col.length;j++) {
                if(attributes_col[j].childNodes.length > 0) {
                    var atr_name = attributes_col[j].getAttribute("name");
                    var atr_value = attributes_col[j].childNodes[0].nodeValue;
                    switch(atr_name) {
                        case "type":
                            type = atr_value;
                            break;
                        case "name":
                            name = atr_value;
                            break;
                        case "url":
                            url = atr_value;
                            break;
                        case "text":
                            text = atr_value;
                            break;
                    }
                }
                
            }
        
        }
        catch(err){
            console.log(err);
            continue;
        }
        
        if((name.toLowerCase().indexOf(query.toLowerCase())>=0))
        {
            count++;
            output+='<tr class="searchresult">';
            output+='<td align="right">'+count+'.</td>';
            output+='<td>'+escapeHtml(type)+'&#160;';
            output+='<a href="'+escapeHtml(url)+'">';
            output+=escapeHtml(name);
            output+='</a>';
            output+='</td>';

            var start=text.toLowerCase().indexOf(query.toLowerCase());
            var fragmentcount=0;
            while(start>=0 && fragmentcount<3)
            {
                quotestart=Math.max(start-30,0);
                quoteend=Math.min(start+query.length+30,text.length);
                fragment='';
                if(quotestart>0)
                    fragment+='...';
                fragment+=escapeHtml(text.substring(quotestart,start));
                fragment+='<span class="hl">';
                fragment+=escapeHtml(text.substring(start,start+query.length));
                fragment+='</span>';
                fragment+=escapeHtml(text.substring(start+query.length,quoteend));
                if(quoteend<query.length);
                    fragment+='...';
                output+='<tr><td></td><td>'+fragment+'</td></tr>';

                start=text.toLowerCase().indexOf(query.toLowerCase(),start+1);
                fragmentcount++;
            }

            output+="</tr>";
        }
    }
    output+="</table>";
    output+="<hr>";
    output+='<table>';
    for (i=0;i<doc.length;i++)
    {
        
        var attributes_col = doc[i].getElementsByTagName("field");
        var type = "";
        var name = "";
        var url = "";
        var text = "";
        
        try { 
        
            for (j=0; j<attributes_col.length;j++) {
                if(attributes_col[j].childNodes.length > 0) {
                    var atr_name = attributes_col[j].getAttribute("name");
                    var atr_value = attributes_col[j].childNodes[0].nodeValue;
                    switch(atr_name) {
                        case "type":
                            type = atr_value;
                            break;
                        case "name":
                            name = atr_value;
                            break;
                        case "url":
                            url = atr_value;
                            break;
                        case "text":
                            text = atr_value;
                            break;
                    }
                }
                
            }
        
        }
        catch(err){
            console.log(err);
            continue;
        }
        
        if((text.toLowerCase().indexOf(query.toLowerCase())>=0))
        {
            count++;
            output+='<tr class="searchresult">';
            output+='<td align="right">'+count+'.</td>';
            output+='<td>'+escapeHtml(type)+'&#160;';
            output+='<a href="'+escapeHtml(url)+'">';
            output+=escapeHtml(name);
            output+='</a>';
            output+='</td>';

            var start=text.toLowerCase().indexOf(query.toLowerCase());
            var fragmentcount=0;
            while(start>=0 && fragmentcount<3)
            {
                quotestart=Math.max(start-30,0);
                quoteend=Math.min(start+query.length+30,text.length);
                fragment='';
                if(quotestart>0)
                    fragment+='...';
                fragment+=escapeHtml(text.substring(quotestart,start));
                fragment+='<span class="hl">';
                fragment+=escapeHtml(text.substring(start,start+query.length));
                fragment+='</span>';
                fragment+=escapeHtml(text.substring(start+query.length,quoteend));
                if(quoteend<query.length);
                    fragment+='...';
                output+='<tr><td></td><td>'+fragment+'</td></tr>';

                start=text.toLowerCase().indexOf(query.toLowerCase(),start+1);
                fragmentcount++;
            }

            output+="</tr>";
        }
    }
    
    output+="</table>";
    var results = $('#searchresults');
    
    if (count==0) {
        results.html('<p>'+searchResultsText[0]+'</p>');
    } else if (count==1) {
        results.html('<p>'+searchResultsText[1]+'</p>');
    } else {
        results.html('<p>'+searchResultsText[2].replace(/\$num/,count)+'</p>');
    }
    
    results.append(output);
}

$(document).ready(function() {
  var query = trim(getURLParameter('query'));
  if (query) {
    searchFor(query,0,20);
  } else {
    var results = $('#results');
    results.html('<p>Sorry, no documents matching your query.</p>');
  }
});
