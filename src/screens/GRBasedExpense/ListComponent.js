import React, { useState } from 'react'
import { ListItem } from '@rneui/themed';
import styles from './styles';

const ListComponent = ({ header, children }) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <ListItem.Accordion
            containerStyle={styles.list}
            content={
                <>
                    <ListItem.Content>
                        <ListItem.Title>
                            {header}
                        </ListItem.Title>
                    </ListItem.Content>
                </>
            }
            isExpanded={expanded}
            onPress={() => {
                setExpanded(!expanded)
            }}
        >
            {children}
        </ListItem.Accordion >
    )
}

export default ListComponent;