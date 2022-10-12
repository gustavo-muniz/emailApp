import { StyleSheet, Text, Image, View, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Email({ navigation }) {

    const [email, setEmail] = useState();

    useEffect(() => {
			async function getData() {
				const response = await fetch('https://mobile.ect.ufrn.br:3002/emails');
				const email = await response.json();
				setEmail(email)
			}
			getData();
    }, []);

    function renderItem({item}) {
			return <TouchableOpacity style={styles.email} onPress={() => navigation.navigate('EmailScreen', { id: item.id })}>
				<Image style={styles.image} source={{ uri: item.picture }}/>
				<View style={styles.mailData}>
					<View style={styles.header}>
						<Text style={styles.textHeader}>{item.from}</Text>
						<Text style={styles.time}>{item.time}</Text>
					</View>
					<Text style={styles.textHeader}>{item.tittle}</Text>
					<Text style={styles.text}>{item.summary}</Text>
					{item.star ? 
						<FontAwesome5 style={styles.starIcon} name="star" size={16} color="yellow" solid/>
						:
						<FontAwesome5 style={styles.starIcon} name="star" size={16} color="grey" />
					}
				</View>
			</TouchableOpacity>
    }
    
    return (
			<View style={styles.inbox}>
				<FlatList
					data={email}
					renderItem={renderItem}
					keyExtractor={item => item.id}
					showsVerticalScrollIndicator={false}
				/>
			</View>
    );
}

const styles = StyleSheet.create({
	inbox: {
		flex: 1,
		backgroundColor: 'white'
	},
	email: {
		height: 100,
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 5
	},
	image: {
		height: 60,
		width: 60,
		borderRadius: 30
	},
	mailData: {
		margin: 10,
	},
	starIcon: {
		position: 'relative',
		left: 270,
		top: -20
	},
	textHeader: {
		fontSize: 15,
		fontWeight: 'bold'
	},
	text: {
		fontSize: 15
	},
	time: {
		fontSize: 12,
		color: 'blue',
		position: 'absolute',
		left: 250,
		top: 3
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	headerRight: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'absolute',
		left: 240,
		top: 0,
	},
});