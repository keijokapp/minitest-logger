
--> Window.tpl
<div style="width: {{ width ?: 200 }}" class="window">
	<h2>{{ heading }}</h2>
	<content />
</div>

--> QsoList.tpl

<Window map="{ width: width, heading: 'QsoList heading' }">
	<table if="qsos.length">
		<tr for="i of qsos"><td>{{ i }}</td></tr>
	</table>
	<div if="!qsos.length">no qsos</div>
</Window>

---> Result

elements:
<!-- parent ; {{ width }} binding -->                <div style="width: {{ width ?: 200 }}" class="window"><h2>QsoList heading</h2> <!-- optimization: inlining --></div>
<!-- for="i of qsos" -->                             <tr for="i of qsos"><td>{{ i }}</td></tr>	
<!-- if="qsos.length" ; parent of elements[0] -->    <table> </table>
<!-- if="!qsos.length" -->                           <div>no qsos</div>

functions:
function() { this.elements[0].setAttribute('style', 'width: ' + this.getAttr('width') } /* depends: width */
function() {
	var c = this._conditions[0];
	if(this.getAttr('qsos.length')) {
		c.prnt.replaceChild(c.if, c.else)
	} else {
		c.prnt.replaceChild(c.else, c.if)
	}

} /* depends qsos.length */
function() { this._repeatedElements[0] }
