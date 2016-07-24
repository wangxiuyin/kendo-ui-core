
package com.kendoui.taglib.multiselect;


import com.kendoui.taglib.BaseTag;


import com.kendoui.taglib.MultiSelectTag;
import com.kendoui.taglib.json.Function;
import javax.servlet.jsp.JspException;


@SuppressWarnings("serial")
public class VirtualTag extends  BaseTag  /* interfaces */ /* interfaces */ {

    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MultiSelectTag parent = (MultiSelectTag)findParentWithClass(MultiSelectTag.class);


        parent.setVirtual(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "multiSelect-virtual";
    }

    public void setValueMapper(VirtualValueMapperFunctionTag value) {
        setEvent("valueMapper", value.getBody());
    }

    public float getItemHeight() {
        return (Float)getProperty("itemHeight");
    }

    public void setItemHeight(float value) {
        setProperty("itemHeight", value);
    }

    public java.lang.String getMapValueTo() {
        return (java.lang.String)getProperty("mapValueTo");
    }

    public void setMapValueTo(java.lang.String value) {
        setProperty("mapValueTo", value);
    }

    public String getValueMapper() {
        Function property = ((Function)getProperty("valueMapper"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setValueMapper(String value) {
        setProperty("valueMapper", new Function(value));
    }

//<< Attributes

}
