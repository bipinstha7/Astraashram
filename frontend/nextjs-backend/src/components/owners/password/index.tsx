import TextInput from '@/components/ui/form/textInput';

export default function Password() {
  return (
    <section>
      <h4>Password</h4>
      <TextInput label="Password" name="password" type="password" infoText="Generate" />
    </section>
  );
}
