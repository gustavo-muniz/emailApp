import react, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function EmailScreen({ route }) {
    const { id } = route.params;
    const [email, setEmail] = useState([]);

    useEffect(() => {
        async function getData() {
            const response = await fetch('https://mobile.ect.ufrn.br:3002/emails/' + id);
            const email = await response.json();
            setEmail(email);
        }
        getData();
    }, []);

    return (
         <View style={styles.emailContainer}>
            <View style={styles.title}>
                <Text style={styles.textTitle}>{email.tittle}</Text>
                {email.star ? 
                    <FontAwesome5 style={styles.starIcon} name="star" size={16} color="yellow" solid/>
                    :
                    <FontAwesome5 style={styles.starIcon} name="star" size={16} color="grey" />
                }
            </View>
            <View style={styles.informations}>
                <View style={styles.infoTexts}>
                    <Image style={styles.image} source={{ uri: email.picture }}/>
                    <View>
                        <Text style={styles.text}>{email.from}</Text>
                        <Text>for me</Text>
                    </View>
                </View>
                <Text>{email.time}</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.textTitle}>{email.body}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    emailContainer: {
        flex: 1,
        margin: 5,
        backgroundColor: 'white',
    },
    title: {
        height: 70,
        padding: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textTitle: {
        fontSize: 25
    },
    text: {
        fontSize: 20
    },
    informations: {
        height: 70,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5
    },
    infoTexts: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    from:{
        flexDirection: 'row',
        alignItems: 'center'  
    },
    image: {
		height: 50,
		width: 50,
		borderRadius: 25,
        margin: 10
	},
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
});
  