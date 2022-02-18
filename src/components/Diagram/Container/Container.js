import PropTypes from 'prop-types';

export default function Container({ tag, title, styleContainer, styleTitle, children }) {
    const Tag = tag;
   
    if(!tag)
    return (
        <div className={styleContainer}>           
            {children}
        </div>        
        )   
    return (
        <div className={styleContainer}>       
           
            <Tag className={styleTitle}>                
                {title}                
            </Tag>           
            
            {children}    
    
        </div>        
    )  
}


Container.propTypes = {
    tag:PropTypes.string,
    title: PropTypes.string,
    styleContainer: PropTypes.string,
    styleTitle: PropTypes.string,
    children: PropTypes.node,
};