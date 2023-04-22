import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import useDefaultStyles from 'components/Colors';
import { NavigationProp } from '../..';
import { useTypedSelector } from 'store';
import { t } from '@localisation';
import Button from 'components/Button';
import { Paragraph } from 'components/Typography';
import { useHeaderHeight } from '@react-navigation/elements';


const InputContainer = styled.View`
    margin: 10px 0;
`;

const Input = styled.TextInput`
    padding: 15px;
    margin-top: 5px;
    border-radius: 5px;
`;

const Container = styled.ScrollView`
    padding: 24px;
`;

export default function LibrarySettings() {
    const defaultStyles = useDefaultStyles();
    const headerHeight = useHeaderHeight();
    const { jellyfin } = useTypedSelector(state => state.settings);
    const navigation = useNavigation<NavigationProp>();
    const handleSetLibrary = useCallback(() => navigation.navigate('SetJellyfinServer'), [navigation]);

    return (
        <Container contentInset={{ top: headerHeight }}>
            <InputContainer>
                <Paragraph style={defaultStyles.text}>{t('jellyfin-server-url')}</Paragraph>
                <Input placeholder="https://jellyfin.yourserver.com/" value={jellyfin?.uri} editable={false} style={defaultStyles.input} />
            </InputContainer>
            <InputContainer>
                <Paragraph style={defaultStyles.text}>{t('jellyfin-access-token')}</Paragraph>
                <Input placeholder="deadbeefdeadbeefdeadbeef" value={jellyfin?.access_token} editable={false} style={defaultStyles.input} />
            </InputContainer>
            <InputContainer>
                <Paragraph style={defaultStyles.text}>{t('jellyfin-user-id')}</Paragraph>
                <Input placeholder="deadbeefdeadbeefdeadbeef" value={jellyfin?.user_id} editable={false} style={defaultStyles.input} />
            </InputContainer>
            <Button title={t('set-jellyfin-server')} onPress={handleSetLibrary} />
        </Container>
    );
}