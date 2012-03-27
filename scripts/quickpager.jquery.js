/*-------------------------------------------------
		Quick Pager jquery plugin
		
		Copyright (C) 2011 by Dan Drayne

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in
		all copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
		THE SOFTWARE.
		
		v1.1/		18/09/09 * bug fix by John V - http://blog.geekyjohn.com/
-------------------------------------------------*/

/*-------------------------------------------------
	Prabhu Manickavelus Jquery update Simple Paginator
-------------------------------------------------*/
(function($) {
	$.fn.quickPager = function(options) {
		var defaults = {
			pageSize: 10,
			currentPage: 1,
			holder: null,
			pagerLocation: "after"
		};
		var options = $.extend(defaults, options);
		return this.each(function() {
			var selector = $(this);	
			var pageCounter = 1;
			selector.wrap("<div class='simplePagerContainer'></div>");
			selector.children().each(function(i){ 
				if(i < pageCounter*options.pageSize && i >= (pageCounter-1)*options.pageSize) {
				$(this).addClass("simplePagerPage"+pageCounter);
				}
				else {
					$(this).addClass("simplePagerPage"+(pageCounter+1));
					pageCounter ++;
				}	
				
			});
			selector.children().hide();
			selector.children(".simplePagerPage"+options.currentPage).show();
			if(pageCounter <= 1) {
				return;
			}
			var pageNav = "<ul class='simplePagerNav'>";	
			for (i=1;i<=pageCounter;i++){
				/*added for Previous link start*/
				if(i==1)
				{
					pageNav += "<li class='simplePageNav'><a rel='prv' href='#'>&lt;Previous</a></li>";	
				}
				/*added for Previous link end*/
				if (i==options.currentPage) {
					pageNav += "<li class='currentPage simplePageNav"+i+"'><a rel='"+i+"' href='#'>"+i+"</a></li>";	
				}
				else {
					pageNav += "<li class='simplePageNav"+i+"'><a rel='"+i+"' href='#'>"+i+"</a></li>";
				}
				/*added for next link start*/
				if(i!=1 && i==pageCounter)
				{
					pageNav += "<li class='simplePageNav'><a rel='nxt' href='#'>Next&gt;</a></li>";
				}
				/*added for next link end*/
			}
			pageNav += "</ul><input type='hidden' id='crnt' value='1'><input type='hidden' id='maxpag' value='"+ pageCounter +"'>";
			if(!options.holder) {
				switch(options.pagerLocation)
				{
				case "before":
					selector.before(pageNav);
				break;
				case "both":
					selector.before(pageNav);
					selector.after(pageNav);
				break;
				default:
					selector.after(pageNav);
				}
			}
			else {
				$(options.holder).append(pageNav);
			}
			selector.parent().find(".simplePagerNav a").click(function() {
				/*rewrote the whole select logig to include previous and next link start*/
				var clickedLink = $(this).attr("rel");
				var crnt=document.getElementById("crnt");
				var maxpag=document.getElementById("maxpag");
				options.currentPage = clickedLink;
				if(!((clickedLink=='prv' && crnt.value==1)||(clickedLink=='nxt' && crnt.value==maxpag.value)))
				{
					if(options.holder) {
						$(this).parent("li").parent("ul").parent(options.holder).find("li.currentPage").removeClass("currentPage");
						if(options.currentPage=='prv')
						{
							crnt.value-=1;
							clickedLink=crnt.value;
							$(this).parent("li").parent("ul").parent(options.holder).find("a[rel='"+crnt.value+"']").parent("li").addClass("currentPage");
						}
						else if(options.currentPage=='nxt')
						{
							crnt.value=(crnt.value*1)+1;
							clickedLink=crnt.value;
							$(this).parent("li").parent("ul").parent(options.holder).find("a[rel='"+crnt.value+"']").parent("li").addClass("currentPage");
						}
						else
						{
							crnt.value=clickedLink;
							$(this).parent("li").parent("ul").parent(options.holder).find("a[rel='"+clickedLink+"']").parent("li").addClass("currentPage");
						}
					}
					else {
						$(this).parent("li").parent("ul").parent(".simplePagerContainer").find("li.currentPage").removeClass("currentPage");
						if(options.currentPage=='prv')
						{
							crnt.value-=1;
							clickedLink=crnt.value;
							$(this).parent("li").parent("ul").parent(".simplePagerContainer").find("a[rel='"+crnt.value+"']").parent("li").addClass("currentPage");
						}
						else if(options.currentPage=='nxt')
						{
							crnt.value=(crnt.value*1)+1;
							clickedLink=crnt.value;
							$(this).parent("li").parent("ul").parent(".simplePagerContainer").find("a[rel='"+crnt.value+"']").parent("li").addClass("currentPage")
						}
						else
						{
							crnt.value=clickedLink;
							$(this).parent("li").parent("ul").parent(".simplePagerContainer").find("a[rel='"+clickedLink+"']").parent("li").addClass("currentPage");
						}
					}
					selector.children().hide();			
					selector.find(".simplePagerPage"+clickedLink).show();
				}
				/*rewrote the whole select logig to include previous and next link end*/
				return false;
			});
		});
	}
})(jQuery);

/*-------------------------------------------------
	Prabhu Manickavelus Jquery Simple Paginator
	Prabhu.Manickavelu@Gmail.Com
	Prabu.Manickavelu@Gmail.Com
	+91-9962032386
-------------------------------------------------*/
